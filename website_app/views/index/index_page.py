# coding:utf-8

import traceback
import ujson
from flask import render_template, abort, g, jsonify, request
from flask import current_app as app
from flask import send_from_directory
from lib.paginator import SQLAlchemyPaginator

from model.session import get_session
from model.image.image_series import ImageSeries, ImageSeriesCategoryRel, ImageSeriesCategory, ImageSeriesRel
from model.image.image import Image
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
        'hot_search_list': []
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


@index.route('/series_list_page', methods=['GET'])
def get_series_list_page():
    result = {
        'response': 'ok',
        'series_category': '',
        'series_list': []
    }
    # 当前connect_id为专题分类id
    connect_id = request.args.get('id')
    page = request.args.get('page', 1)
    limit = 12
    try:
        with get_session() as db_session:
            image_series_category = db_session.query(ImageSeriesCategory).get(connect_id)
            image_series_category_dict = image_series_category.to_dict()
            result['series_category'] = image_series_category_dict

            query = db_session.query(ImageSeriesCategoryRel).join(
                ImageSeriesCategory, ImageSeriesCategory.id == ImageSeriesCategoryRel.category_id
            ).filter(
                ImageSeriesCategory.id == connect_id
            ).all()
            image_series_ids = [image_series_category_rel.series_id for image_series_category_rel in query]
            query = db_session.query(ImageSeries).filter(
                ImageSeries.id.in_(image_series_ids)
            ).order_by(-ImageSeries.created_date)

            paginator = SQLAlchemyPaginator(query, limit)
            page = paginator.get_validate_page(page)

            _image_series_list = list()
            for image_series in paginator.page(page):
                image_series_dict = image_series.to_dict()
                width, height = image_series.get_cover_img_info()
                image_series_dict['width'] = width
                image_series_dict['height'] = height
                _image_series_list.append(image_series_dict)
            result['series_list'] = _image_series_list
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


@index.route('/image_list_page', methods=['GET'])
def get_image_list_page():
    result = {
        'response': 'ok',
        'image_series': '',
        'image_list': []
    }
    # 当前connect_id为专题id
    connect_id = request.args.get('id')
    page = request.args.get('page', 1)
    limit = 20
    try:
        with get_session() as db_session:
            image_series = db_session.query(ImageSeries).get(connect_id)
            if image_series:
                image_series_dict = image_series.to_dict()
                result['image_series'] = image_series_dict

                query = db_session.query(ImageSeriesRel).join(
                    ImageSeries, ImageSeries.id == ImageSeriesRel.image_series_id
                ).filter(
                    ImageSeries.id == connect_id
                ).all()

                image_ids = [image_rel.image_id for image_rel in query]
                query = db_session.query(Image).filter(
                    Image.id.in_(image_ids)
                ).order_by(-Image.created_date)

                paginator = SQLAlchemyPaginator(query, limit)
                page = paginator.get_validate_page(page)

                _image_list = list()
                for image in paginator.page(page):
                    image_dict = image.to_dict()
                    _image_list.append(image_dict)
                result['image_list'] = _image_list
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


@index.route('/image_detail', methods=['GET'])
def get_image_detail():
    result = {
        'response': 'ok',
        'image': '',
        'info': ''
    }
    image_id = request.args.get('id')
    try:
        with get_session() as db_session:
            image = db_session.query(Image).get(image_id)
            if image:
                image_dict = image.to_dict()
                result['image'] = image_dict
            else:
                result.update({
                    'response': 'fail',
                    'info': u'抱歉~图片好像走丢了...'
                })
        return jsonify(result)
    except Exception as e:
        print e


@index.route('/image_full_url', methods=['GET'])
def get_image_full_url():
    result = {
        'response': 'ok',
        'info': ''
    }
    image_id = request.args.get('id')
    try:
        with get_session() as db_session:
            image = db_session.query(Image).get(image_id)
            if image:
                img_full_url = image.img_full_url
            else:
                result.update({
                    'response': 'fail',
                    'info': u'抱歉~图片好像走丢了...'
                })
            return send_from_directory(img_full_url)
    except Exception as e:
        print e