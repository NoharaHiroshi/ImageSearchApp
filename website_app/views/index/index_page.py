# coding:utf-8

import traceback
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
from lib.breadcrumb_navigation import breadcrumb_navigation

from redis_store.redis_cache import common_redis

from model.session import get_session
from model.website.customer import Customer, CustomerCollect
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


@index.route('/', methods=['GET'])
def index_page():
    try:
        return render_template('tpl/index.html')
    except Exception as e:
        app.my_logger.error(traceback.format_exc(e))
        abort(400)


@index.route('/header', methods=['GET'])
def get_index_header():
    result = {
        'response': 'ok',
        'banner_list': [],
        'menu_list': [],
        'hot_search_list': [],
        'customer': ''
    }
    try:
        with get_session() as db_session:
            all_banner = db_session.query(Banner).all()
            all_hot_search = db_session.query(WebsiteHotSearch).filter(
                WebsiteHotSearch.status == WebsiteHotSearch.STATUS_NORMAL
            ).all()
            all_menu = db_session.query(WebsiteMenu).filter(
                WebsiteMenu.parent_id == 0
            ).all()
            _banner_list = list()
            _hot_search_list = list()
            _menu_list = list()
            for banner in all_banner:
                banner_dict = banner.to_dict()
                img_url = banner.get_banner_img(db_session)
                banner_dict['img_url'] = img_url
                _banner_list.append(banner_dict)
            for menu in all_menu:
                menu_dict = menu.to_dict()
                _menu_list.append(menu_dict)
            for hot_search in all_hot_search:
                hot_search_dict = hot_search.to_dict()
                _hot_search_list.append(hot_search_dict)
            result.update({
                'banner_list': _banner_list,
                'menu_list': _menu_list,
                'hot_search_list': _hot_search_list
            })
            if current_user.is_authenticated():
                customer_dict = current_user.to_dict()
                result.update({
                    'customer': customer_dict
                })
        return jsonify(result)
    except Exception as e:
        print e


@index.route('/register', methods=['POST'])
def register():
    try:
        result = {
            'response': 'ok',
            'info': ''
        }
        name = request.form.get('name')
        email = request.form.get('email')
        password = request.form.get('password')
        with get_session() as db_session:
            customer = db_session.query(Customer).filter(
                Customer.email == email
            ).first()
            if customer:
                result.update({
                    'response': 'fail',
                    'info': '当前用户已经存在'
                })
            else:
                customer = Customer()
                customer.email = email
                customer.name = name
                customer.password = AESCipher.encrypt(password)
                db_session.add(customer)
                db_session.commit()
        return jsonify(result)
    except Exception as e:
        print traceback.format_exc(e)


@index.route('/login', methods=['POST'])
def login():
    try:
        result = {
            'response': 'ok',
            'info': ''
        }
        # 持久会话
        session.permanent = True
        user = request.form.get('user')
        password = request.form.get('password')

        # 对已登录用户进行跳转
        if current_user.is_authenticated():
            return jsonify(result)
        else:
            with get_session() as db_session:
                customer = db_session.query(Customer).filter(
                    or_(
                        Customer.email == user,
                        Customer.phone == user,
                    )
                ).first()
                if customer:
                    if password == AESCipher.decrypt(customer.password):
                        login_user(customer)
                    else:
                        result.update({
                            'response': 'fail',
                            'info': u'密码错误'
                        })
                else:
                    result.update({
                        'response': 'fail',
                        'info': u'当前用户不存在'
                    })
            return jsonify(result)
    except Exception as e:
        print traceback.format_exc(e)


@index.route('/logout', methods=['GET'])
def logout():
    result = {
        'response': 'ok',
        'info': ''
    }
    try:
        logout_user()
        return jsonify(result)
    except Exception as e:
        print e


@index.route('/footer', methods=['GET'])
def get_footer():
    result = {
        'response': ''
    }
    try:
        return jsonify(result)
    except Exception as e:
        print e


@index.route('/bread_nav', methods=['GET'])
def bread_nav():
    result = {
        'response': 'ok',
        'bread_nav': []
    }
    url = request.args.get('url')
    nav_list = breadcrumb_navigation(url)
    result.update({
        'bread_nav': nav_list
    })
    return jsonify(result)


@index.route('/main_page', methods=['GET'])
def get_index_main_page():
    result = {
        'response': 'ok',
        'column_list': [],
    }
    try:
        with get_session() as db_session:
            all_column = db_session.query(WebsiteColumn).all()
            if all_column:
                for column in all_column:
                    column_dict = column.to_dict()
                    series_list = list()
                    column_all_series_rel = db_session.query(WebsiteColumnSeriesRel).filter(
                        WebsiteColumnSeriesRel.column_id == column.id,
                        WebsiteColumnSeriesRel.type == WebsiteColumnSeriesRel.TYPE_SHOW
                    ).all()
                    all_series_ids = [series_rel.series_id for series_rel in column_all_series_rel]
                    column_all_series = db_session.query(ImageSeries).filter(
                        ImageSeries.id.in_(all_series_ids)
                    ).all()
                    for column_series in column_all_series:
                        column_series_dict = column_series.to_dict()
                        series_list.append(column_series_dict)
                    # 首页只显示4个最新添加的专题
                    column_dict['series_list'] = series_list[:4]
                    result['column_list'].append(column_dict)
        return jsonify(result)
    except Exception as e:
        print e