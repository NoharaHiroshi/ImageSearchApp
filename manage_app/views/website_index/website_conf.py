# encoding=utf-8

import traceback
from flask import render_template, abort, g, jsonify, request
from flask import current_app as app

from model.website.website_conf import WebsiteConf
from model.session import get_session

from route import website


@website.route('/website_info', methods=['GET'])
def get_website_conf():
    result = {
        'response': 'ok',
        'website_conf': ''
    }
    try:
        with get_session() as db_session:
            website_conf = db_session.query(WebsiteConf).first()
            if website_conf:
                website_conf_dict = website_conf.to_dict()
                result.update({
                    'website_conf': website_conf_dict
                })
            return jsonify(result)
    except Exception as e:
        print traceback.format_exc(e)


@website.route('/website_info/update', methods=['POST'])
def update_website_conf():
    result = {
        'response': 'ok',
        'info': ''
    }
    try:
        pass
    except Exception as e:
        print traceback.format_exc(e)