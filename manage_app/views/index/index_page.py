# coding:utf-8

import traceback
import ujson
from flask import render_template, abort, g, jsonify, request
from flask import current_app as app

from model.session import get_session
from model.image.image_series import ImageSeries
from model.website.menu import WebsiteMenu
from model.website.banner import Banner
from model.website.hot_search import WebsiteHotSearch
from model.website.column import WebsiteColumn, WebsiteColumnSeriesRel

from route import index


@index.route('/', methods=['GET'])
def index_page():
    try:
        return render_template('tpl/index/index.html')
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
                    column_all_series = db_session.query(ImageSeries).join(
                        WebsiteColumnSeriesRel, WebsiteColumnSeriesRel.series_id == ImageSeries.id
                    ).order_by(-ImageSeries.created_date).all()
                    for column_series in column_all_series:
                        column_series_dict = column_series.to_dict()
                        series_list.append(column_series_dict)
                    # 首页只显示4个最新添加的专题
                    column_dict['series_list'] = series_list[:4]
                    result['column_list'].append(column_dict)
        return jsonify(result)
    except Exception as e:
        print e