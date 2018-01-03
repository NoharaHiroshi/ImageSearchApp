# coding:utf-8

import traceback
from flask import render_template, abort, g, jsonify, request
from flask import current_app as app

from model.session import get_session
from model.website.banner import Banner
from model.image.image import Image
from model.image.image_series import ImageSeries

from lib.upload_image import save_images

from route import website


@website.route('/banner_list', methods=['GET'])
def banner_list():
    result = {
        'response': 'ok',
        'banner_list': [],
    }
    try:
        _banner_list = list()
        with get_session() as db_session:
            all_banner = db_session.query(Banner).all()
            for banner in all_banner:
                banner_dict = banner.to_dict()
                img_url = banner.get_banner_img(db_session)
                banner_dict['img_url'] = img_url
                _banner_list.append(banner_dict)
        result['banner_list'] = _banner_list
        return jsonify(result)
    except Exception as e:
        app.my_logger.error(traceback.format_exc(e))
        abort(400)


@website.route('/banner_list/detail', methods=['GET'])
def get_banner_detail():
    result = {
        'response': 'ok',
        'info': '',
        'banner': ''
    }
    _id = request.args.get('id')
    try:
        with get_session() as db_session:
            banner = db_session.query(Banner).get(_id)
            if banner:
                banner_dict = banner.to_dict()
                result['banner'] = banner_dict
            else:
                result.update({
                    'response': 'fail',
                    'info': u'当前轮播图不存在'
                })
        return jsonify(result)
    except Exception as e:
        print e


@website.route('/banner/upload', methods=['POST'])
def banner_upload():
    result = {
        'response': 'ok',
        'info': '',
        'img_id_list': []
    }
    file_objects = request.files.getlist('uploadedfile')
    try:
        if None in [file_objects]:
            result.update({
                'response': 'fail',
                'info': u'请上传图片'
            })
        else:
            # 存储banner图片
            img_id_list = save_images(file_objects, t=Image.TYPE_BANNER)
            result['img_id_list'] = img_id_list
    except:
        result.update({
            'response': 'fail',
            'info': u'图片上传失败'
        })
    return jsonify(result)


@website.route('/banner_list/update', methods=['POST'])
def update_banner():
    result = {
        'response': 'ok',
        'info': ''
    }
    banner_id = request.form.get('id')
    name = request.form.get('name')
    img_id = request.form.get('img_id')
    _type = request.form.get('type')
    connect_id = request.form.get('connect_id')
    connect_name = request.form.get('connect_name')
    background_color = request.form.get('background_color')
    try:
        if None in [name, connect_id, img_id]:
            result.update({
                'response': 'fail',
                'info': u'请检查参数是否填写完整'
            })
        else:
            with get_session() as db_session:
                if not banner_id:
                    banner = Banner()
                    banner.name = name
                    banner.connect_id = connect_id
                    banner.connect_name = connect_name
                    banner.type = _type
                    banner.img_id = img_id
                    banner.background_color = background_color
                    db_session.add(banner)
                else:
                    banner = db_session.query(Banner).get(banner_id)
                    if banner:
                        banner.name = name
                        banner.connect_id = connect_id
                        banner.connect_name = connect_name
                        banner.type = _type
                        banner.img_id = img_id
                        banner.background_color = background_color
                    else:
                        result['response'] = 'fail'
                        result['info'] = u'当前对象不存在'
                db_session.commit()
        return jsonify(result)
    except Exception as e:
        print e.message
