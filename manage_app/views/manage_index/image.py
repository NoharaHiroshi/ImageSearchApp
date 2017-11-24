# coding:utf-8

import traceback
import time
import os
from PIL import Image
from flask import render_template, abort, g, redirect, url_for, request, jsonify, session
from flask.ext.login import current_user, login_user, logout_user, login_required
from flask import current_app as app
from sqlalchemy import or_, func, and_
from lib.upload_image import save_images, delete_images
from lib.paginator import SQLAlchemyPaginator
from model.session import get_session
from model.image.image import Image as Img
from model.image.image_series import ImageSeriesRel, ImageSeries

from route import manage


@manage.route('/upload_image', methods=['POST'])
@login_required
def upload_image():
    result = {
        'response': 'ok',
        'info': ''
    }
    file_objects = request.files.getlist('uploadedfile')
    try:
        if None in [file_objects]:
            result.update({
                'response': 'fail',
                'info': u'请上传图片'
            })
        else:
            save_images(file_objects)
        return jsonify(result)
    except Exception as e:
        print e
        abort(400)


@manage.route('/image_info', methods=['GET'])
def image_info():
    result = {
        'response': 'ok',
        'image_series_list': []
    }
    try:
        with get_session() as db_session:
            all_image_series = db_session.query(ImageSeries).all()
            _image_series_list = list()
            for image_series in all_image_series:
                image_series_dict = image_series.to_dict()
                _image_series_list.append(image_series_dict)
            result['image_series_list'] = _image_series_list
        return jsonify(result)
    except Exception as e:
        print e
        abort(400)


@manage.route('/image_list', methods=['GET'])
def image_list():
    result = {
        'response': 'ok',
        'image_list': [],
        'meta': {}
    }
    limit = 5
    page = request.args.get('page', 1)
    try:
        with get_session() as db_session:
            query = db_session.query(Img)

            paginator = SQLAlchemyPaginator(query, limit)
            page = paginator.get_validate_page(page)

            _img_list = list()
            for img in paginator.page(page):
                img_dict = img.to_dict()
                _img_list.append(img_dict)

            result.update({
                'image_list': _img_list
            })

            result.update({
                'meta': {
                    'cur_page': page,
                    'all_page': paginator.max_page,
                    'count': paginator.count
                }
            })

            return jsonify(result)
    except Exception as e:
        print e
        abort(400)


@manage.route('/image_list/delete', methods=['POST'])
def delete_image_list():
    result = {
        'response': 'ok',
        'info': ''
    }
    ids = request.form.get('ids').split(',')
    try:
        if ids[0]:
            # 删除记录的同时，删除本地文件
            delete_images(ids=ids)
        else:
            result.update({
                'response': 'fail',
                'info': u'当前未选择任何图片'
            })
        return jsonify(result)
    except Exception as e:
        app.my_logger.error(traceback.format_exc(e))
        abort(400)


@manage.route('/set_image_cover', methods=['POST'])
def set_image_cover():
    result = {
        'response': 'ok',
        'info': ''
    }
    image_id = request.form.get('image_id').split(',')
    series_id = request.form.get('series_id')
    try:
        if len(image_id) == 1 and image_id[0] != u'':
            image_id = image_id[0]
            with get_session() as db_session:
                image_series = db_session.query(ImageSeries).get(series_id)
                if image_series:
                    image_series.cover_image_id = image_id
                    db_session.commit()
                else:
                    result.update({
                        'response': 'fail',
                        'info': u'当前选择的专题不存在'
                    })
        else:
            result.update({
                'response': 'fail',
                'info': u'设置专题封面只能选择一张图片'
            })
        return jsonify(result)
    except Exception as e:
        app.my_logger.error(traceback.format_exc(e))
        abort(400)


@manage.route('/image_series_list', methods=['GET'])
def image_series_list():
    result = {
        'response': 'ok',
        'image_series_list': [],
        'info': ''
    }
    try:
        with get_session() as db_session:
            all_image_series = db_session.query(ImageSeries).all()
            _image_series_list = list()
            for image_series in all_image_series:
                image_series_dict = image_series.to_dict()
                _image_series_list.append(image_series_dict)
            result['image_series_list'] = _image_series_list
        return jsonify(result)
    except Exception as e:
        print e
        abort(400)


@manage.route('/image_series_list/detail', methods=['GET'])
def get_image_series_detail():
    result = {
        'response': 'ok',
        'info': '',
        'image_series': ''
    }
    try:
        _id = request.args.get('id')
        with get_session() as db_session:
            image_series = db_session.query(ImageSeries).get(_id)
            if image_series:
                image_series_dict = image_series.to_dict()
                result['image_series'] = image_series_dict
            else:
                result.update({
                    'response': 'fail',
                    'info': u'当前系列不存在'
                })
        return jsonify(result)
    except Exception as e:
        app.my_logger.error(traceback.format_exc(e))
        abort(400)


@manage.route('/image_series_list/update', methods=['POST'])
def update_image_series_detail():
    result = {
        'response': 'ok',
        'info': ''
    }
    image_series_id = request.form.get('id')
    image_series_name = request.form.get('name')
    image_series_desc = request.form.get('desc')
    try:
        if None in [image_series_name]:
            result.update({
                'response': 'fail',
                'info': u'请检查参数是否填写完整'
            })
        else:
            with get_session() as db_session:
                if not image_series_id:
                    image_series = ImageSeries()
                    image_series.name = image_series_name
                    image_series.desc = image_series_desc
                    image_series.author = current_user.name
                    db_session.add(image_series)
                else:
                    image_series = db_session.query(ImageSeries).get(image_series_id)
                    if image_series:
                        image_series.name = image_series_name
                        image_series.desc = image_series_desc
                    else:
                        result['response'] = 'fail'
                        result['info'] = u'当前对象不存在'
                db_session.commit()
        return jsonify(result)
    except Exception as e:
        app.my_logger.error(traceback.format_exc(e))
        abort(400)

if __name__ == '__main__':
    pass
