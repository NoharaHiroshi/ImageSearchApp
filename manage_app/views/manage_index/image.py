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
def delete_image():
    result = {
        'response': 'ok',
        'info': ''
    }
    ids = request.form.get('ids').split(',')
    try:
        if ids[0]:
            # 删除记录的同时，删除本地文件
            with get_session() as db_session:
                delete_image(ids=ids)
        else:
            result.update({
                'response': 'fail',
                'info': u'当前未选择任何图片'
            })
        return jsonify(result)
    except Exception as e:
        app.my_logger.error(traceback.format_exc(e))
        abort(400)

if __name__ == '__main__':
    pass
