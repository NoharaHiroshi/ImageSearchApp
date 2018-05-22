# coding:utf-8

import traceback
import time
import datetime
from flask import render_template, abort, g, redirect, url_for, request, jsonify, session
from flask.ext.login import current_user, login_user, logout_user, login_required
from flask import current_app as app
from sqlalchemy import or_, func, and_

from model.session import get_session
from model.website.customer import Customer
from model.image.image import Image
from model.image.image_download_history import ImageDownloadHistory
from model.image.image_series import ImageSeries

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
            # 会员数量
            all_customer = db_session.query(Customer)
            all_customer_count = all_customer.count()
            result['dashboard_info']['all_customer_count'] = all_customer_count

            # 图片数量
            all_pic_obj = db_session.query(Image)
            all_pic_count = all_pic_obj.count()
            result['dashboard_info']['all_pic_count'] = all_pic_count

            # 昨日上传图片
            upload_pic_obj = all_pic_obj.filter(
                Image.created_date >= yesterday_start,
                Image.created_date <= yesterday_end
            )
            upload_pic_count = upload_pic_obj.count()
            result['dashboard_info']['upload_pic_count'] = upload_pic_count

            # 昨日下载图片数量
            download_pic_obj = db_session.query(ImageDownloadHistory).filter(
                ImageDownloadHistory.created_date >= yesterday_start,
                ImageDownloadHistory.created_date <= yesterday_end
            )
            download_pic_count = download_pic_obj.count()
            result['dashboard_info']['download_pic_count'] = download_pic_count

            # 专题数量
            all_series_obj = db_session.query(ImageSeries)
            all_series_count = all_series_obj.count()
            result['dashboard_info']['all_series_count'] = all_series_count
        return jsonify(result)
    except Exception as e:
        app.my_logger.error(traceback.format_exc(e))
        abort(400)

if __name__ == '__main__':
    pass