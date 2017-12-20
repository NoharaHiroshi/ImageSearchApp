# coding:utf-8

import traceback
import time
import datetime
from flask import render_template, abort, g, redirect, url_for, request, jsonify, session
from flask.ext.login import current_user, login_user, logout_user, login_required
from flask import current_app as app
from sqlalchemy import or_, func, and_

from model.session import get_session
from model.manage.user import User
from model.image.image import Image

from lib.aes_encrypt import AESCipher

from route import manage


@manage.route('/dashboard/info', methods=['GET'])
def dashboard_info():
    result = {
        'response': 'ok',
        'dashboard_info': {}
    }
    try:
        yesterday = datetime.datetime.now() - datetime.timedelta(days=1)
        yesterday_start = datetime.datetime.strftime(yesterday, '%Y-%m-%d 00:00:00')
        yesterday_end = datetime.datetime.strftime(yesterday, '%Y-%m-%d 23:59:59')
        with get_session() as db_session:
            # 图片数量
            all_pic_obj = db_session.query(Image)
            # 昨日上传图片
            upload_pic_obj = all_pic_obj.filter(
                Image.created_date >= yesterday_start,
                Image.created_date <= yesterday_end
            )
            all_pic_count = all_pic_obj.count()
            upload_pic_count = upload_pic_obj.count()
            result['dashboard_info']['all_pic_count'] = all_pic_count
            result['dashboard_info']['upload_pic_count'] = upload_pic_count
        return jsonify(result)
    except Exception as e:
        app.my_logger.error(traceback.format_exc(e))
        abort(400)

if __name__ == '__main__':
    pass