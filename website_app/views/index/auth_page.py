# coding:utf-8

import traceback
import re
import ujson
import os
from sqlalchemy import or_
from flask import render_template, abort, g, jsonify, request, session, redirect, url_for
from flask.ext.login import current_user, login_user, logout_user
from flask import current_app as app
from flask import send_from_directory
from lib.paginator import SQLAlchemyPaginator
from lib.login_required import login_required
from lib.aes_encrypt import AESCipher

from redis_store.redis_cache import common_redis

from model.session import get_session
from model.website.customer import Customer
from model.image.image_series import ImageSeries, ImageSeriesCategoryRel, ImageSeriesCategory, ImageSeriesRel
from model.image.image_download_history import ImageDownloadHistory
from model.image.image import Image
from model.image.image_tags import ImageTags, ImageTagsRel,ImageRecommendTagsRel, ImageRecommendTags
from model.website.menu import WebsiteMenu
from model.website.banner import Banner
from model.website.hot_search import WebsiteHotSearch
from model.website.column import WebsiteColumn, WebsiteColumnSeriesRel

from route import index
from website_app.config import config


# 获取用户邮箱后缀，根据后缀获取登陆邮箱的页面
def get_customer_email_url(email):
    email_type = re.findall('@.+\.', email)[0][1:-1]
    if email_type == 'qq':
        email_login_url = 'https://mail.qq.com/'
    elif email_type == '163':
        email_login_url = 'https://mail.163.com/'
    elif email_type == 'sina':
        email_login_url = 'http://mail.sina.com.cn/'
    elif email_type == 'sohu':
        email_login_url = 'https://mail.sohu.com/'
    elif email_type == 'yahoo':
        email_login_url = 'https://cn.overview.mail.yahoo.com/'
    else:
        email_login_url = '#'
    return email_login_url


@index.route('/auth_customer_page', methods=['GET'])
@login_required
def auth_customer_page():
    result = {
        'response': 'ok',
        'user': '',
        'info': '',
        'email_login_url': ''
    }
    try:
        if current_user.is_authenticated():
            email_login_url = get_customer_email_url(current_user.email)
            user_dict = current_user.to_dict()
            result.update({
                'user': user_dict,
                'email_login_url': email_login_url
            })
        else:
            result.update({
                'response': 'fail',
                'info': u'当前用户未登录，请返回登陆'
            })
        return jsonify(result)
    except Exception as e:
        print traceback.format_exc(e)

if __name__ == '__main__':
    get_customer_email_url('18222109895@163.com')