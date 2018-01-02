# coding:utf-8

import traceback
from flask import render_template, abort, g, jsonify, request
from flask import current_app as app

from model.session import get_session
from model.website.banner import Banner
from model.image.image_series import ImageSeries

from route import website


@website.route('/banner_list', methods=['GET'])
def banner_list():
    result = {
        'response': 'ok',
        'banner_list': [],
    }
    try:
        _banner_list = list()
        with get_session() as db_session:
            all_banner = db_session.query(Banner).all()
            for banner in all_banner:
                banner_dict = banner.to_dict()
                _banner_list.append(banner_dict)
        result['banner_list'] = _banner_list
        return jsonify(result)
    except Exception as e:
        app.my_logger.error(traceback.format_exc(e))
        abort(400)