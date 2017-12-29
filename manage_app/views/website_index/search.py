# coding:utf-8

import traceback
from flask import render_template, abort, g, jsonify, request
from flask import current_app as app

from model.session import get_session
from model.website.menu import WebsiteMenu
from model.image.image_series import ImageSeries
from model.website.hot_search import WebsiteHotSearch

from route import website


@website.route('/hot_search_list', methods=['GET'])
def get_hot_search():
    result = {
        'response': 'ok',
        'hot_search_list': [],
    }
    try:
        with get_session() as db_session:
            query = db_session.query(WebsiteHotSearch, ImageSeries).join(
                ImageSeries, ImageSeries.id == WebsiteHotSearch.connect_id
            ).order_by(-WebsiteHotSearch.ranking).all()
            _hot_search_list = list()
            for hot_search, image_series in query:
                hot_search_dict = hot_search.to_dict()
                hot_search_dict['connect_name'] = image_series.name
                _hot_search_list.append(hot_search_dict)
            result.update({
                'hot_search_list': _hot_search_list
            })
        return jsonify(result)
    except Exception as e:
        print e


@website.route('/hot_search_list/detail', methods=['GET'])
def get_hot_search_detail():
    result = {
        'response': 'ok',
        'info': '',
        'hot_search': ''
    }
    _id = request.args.get('id')
    try:
        with get_session() as db_session:
            hot_search = db_session.query(WebsiteHotSearch).get(_id)
            if hot_search:
                hot_search_dict = hot_search.to_dict()
                result['hot_search'] = hot_search_dict
            else:
                result.update({
                    'response': 'fail',
                    'info': u'当前热搜关键词不存在'
                })
        return jsonify(result)
    except Exception as e:
        print e


@website.route('/hot_search_list/update', methods=['POST'])
def update_hot_search():
    result = {
        'response': 'ok',
        'info': ''
    }
    hot_search_id = request.form.get('id')
    name = request.form.get('name')
    connect_id = request.form.get('connect_id')
    status = request.form.get('status')
    ranking = request.form.get('ranking')
    try:
        if None in [name, connect_id, status, ranking]:
            result.update({
                'response': 'fail',
                'info': u'请检查参数是否填写完整'
            })
        else:
            with get_session() as db_session:
                if not hot_search_id:
                    hot_search = WebsiteHotSearch()
                    hot_search.name = name
                    hot_search.connect_id = connect_id
                    hot_search.ranking = ranking
                    hot_search.status = status
                    db_session.add(hot_search)
                else:
                    hot_search = db_session.query(WebsiteHotSearch).get(hot_search_id)
                    if hot_search:
                        hot_search.name = name
                        hot_search.connect_id = connect_id
                        hot_search.status = status
                        hot_search.ranking = ranking
                    else:
                        result['response'] = 'fail'
                        result['info'] = u'当前对象不存在'
                db_session.commit()
        return jsonify(result)
    except Exception as e:
        print e