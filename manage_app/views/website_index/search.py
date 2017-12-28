# coding:utf-8

import traceback
from flask import render_template, abort, g, jsonify, request
from flask import current_app as app

from model.session import get_session
from model.website.menu import WebsiteMenu
from model.image.image_series import ImageSeries
from model.website.hot_search import WebsiteHotSearch

from route import website


@website.route('/hot_search', methods=['GET'])
def get_hot_search():
    result = {
        'response': 'ok',
        'hot_search_list': [],
    }
    try:
        with get_session() as db_session:
            query = db_session.query(WebsiteHotSearch).all()
            _hot_search_list = list()
            for hot_search in query:
                hot_search_dict = hot_search.to_dict()
                _hot_search_list.append(hot_search_dict)
            result.update({
                'hot_search_list': _hot_search_list
            })
        return jsonify(result)
    except Exception as e:
        print e