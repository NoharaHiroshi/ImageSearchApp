# coding:utf-8

import traceback
import time
import os
from PIL import Image
from flask import render_template, abort, g, redirect, url_for, request, jsonify, session
from flask.ext.login import current_user, login_user, logout_user, login_required
from flask import current_app as app
from sqlalchemy import or_, func, and_
from lib.upload_image import save_images
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
                'info': u'请检查参数是否填写完整'
            })
        else:
            for file_obj in file_objects:
                save_images(file_obj, auto_commit=True)
        return jsonify(result)
    except Exception as e:
        print e
        abort(400)

if __name__ == '__main__':
    pass
