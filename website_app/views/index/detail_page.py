# coding:utf-8

import traceback
import ujson
import os
from flask import render_template, abort, g, jsonify, request, session, redirect, url_for
from flask.ext.login import current_user
from flask import send_from_directory
from lib.login_required import login_required

from redis_store.redis_cache import common_redis

from model.session import get_session
from model.website.customer import Customer, CustomerCollect
from model.image.image_download_history import ImageDownloadHistory
from model.image.image import Image
from model.image.image_tags import ImageTags, ImageTagsRel

from route import index
from website_app.config import config


@index.route('/image_detail', methods=['GET'])
def get_image_detail():
    result = {
        'response': 'ok',
        'image': '',
        'is_collected': False,
        'tag_list': [],
        'info': ''
    }
    image_id = request.args.get('id')
    try:
        with get_session() as db_session:
            image = db_session.query(Image).get(image_id)
            if image:
                # 图片浏览量+1
                image.view_count += 1
                image_dict = image.to_dict()
                result['image'] = image_dict
                db_session.commit()

                # 如果当前用户收藏了该图片则显示
                if current_user.is_authenticated():
                    image_collect = db_session.query(CustomerCollect).filter(
                        CustomerCollect.collect_id == image_id,
                        CustomerCollect.customer_id == current_user.id,
                        CustomerCollect.type == CustomerCollect.TYPE_IMAGE
                    ).first()
                    if image_collect:
                        result['is_collected'] = True

                # 获取图片的标签
                tag_list_query = db_session.query(ImageTags).join(
                    ImageTagsRel, ImageTags.id == ImageTagsRel.tag_id
                ).filter(
                    ImageTagsRel.image_id == image_id
                ).all()
                tag_list = list()
                for tag in tag_list_query:
                    tag_dict = tag.to_dict()
                    tag_list.append(tag_dict)
                result['tag_list'] = tag_list
            else:
                result.update({
                    'response': 'fail',
                    'info': u'抱歉~图片好像走丢了...'
                })
        return jsonify(result)
    except Exception as e:
        print e


@index.route('/check_image', methods=['GET'])
@login_required
def check_image():
    result = {
        'response': 'ok',
        'info': '',
    }
    image_id = request.args.get('id')
    try:
        with get_session() as db_session:
            image = db_session.query(Image).get(image_id)
            if image:
                download_key = u'download_image_%s' % current_user.id
                download_max_times = config.FREE_DOWNLOAD_TIMES
                download_times = common_redis.get(download_key)
                if download_times:
                    download_times = int(download_times)
                    if download_times >= download_max_times:
                        result.update({
                            'response': 'fail',
                            'info': u'超过最大下载次数'
                        })
            else:
                result.update({
                    'response': 'fail',
                    'info': u'图片不存在'
                })
            return jsonify(result)
    except Exception as e:
        print e


@index.route('/image_full_url', methods=['GET'])
@login_required
def get_image_full_url():
    image_id = request.args.get('id')
    try:
        with get_session() as db_session:
            image = db_session.query(Image).get(image_id)
            # 防止跳过图片检验直接访问该链接
            download_key = u'download_image_%s' % current_user.id
            expired_time = config.FREE_DOWNLOAD_EXPIRED_TIME
            download_max_times = config.FREE_DOWNLOAD_TIMES
            download_times = common_redis.get(download_key)
            if download_times:
                download_times = int(download_times)
                if download_times >= download_max_times:
                    return jsonify({
                        'response': 'fail',
                        'info': u'超过最大下载次数'
                    })
                else:
                    download_times += 1
                    common_redis.setex(download_key, expired_time, download_times)
            else:
                common_redis.setex(download_key, expired_time, 1)

            # 记录当前用户下载记录
            download_history = ImageDownloadHistory()
            download_history.customer_id = current_user.id
            download_history.customer_name = current_user.name
            download_history.image_id = image.id
            db_session.add(download_history)
            # 图片下载次数+1
            image.download_count += 1
            db_session.commit()

            file_url = image.img_full_url
            file_full_path = os.path.join(config.DOWNLOAD_SRC, file_url).replace('/', '\\')
            file_name = file_full_path.split('\\')[-1]
            file_dir = '\\'.join(file_full_path.split('\\')[:-1])
            if os.path.isfile(file_full_path):
                return send_from_directory(file_dir, file_name, as_attachment=True)
    except Exception as e:
        print e
