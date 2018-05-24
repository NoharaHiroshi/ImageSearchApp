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
            else:
                website_conf = WebsiteConf()
                website_conf.website_url = ''
                website_conf.resource_url = ''
                website_conf.free_download_count = 0
                website_conf.free_download_time = 0
                db_session.add(website_conf)
                db_session.commit()
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
    resource_url = request.form.get('resource_url', '')
    website_url = request.form.get('website_url', '')
    free_download_count = request.form.get('free_download_count', 0)
    free_download_time = request.form.get('free_download_time', 3600*24)
    try:
        if None in [resource_url, website_url, free_download_count, free_download_time]:
            result.update({
                'response': 'fail',
                'info': u'请检查参数是否填写完整'
            })
        else:
            with get_session() as db_session:
                website_conf = db_session.query(WebsiteConf).first()
                if website_conf:
                    website_conf.resource_url = resource_url
                    website_conf.website_url = website_url
                    website_conf.resource_url = resource_url
                    website_conf.website_url = website_url
                else:
                    website_conf = WebsiteConf()
                    website_conf.resource_url = resource_url
                    website_conf.website_url = website_url
                    website_conf.resource_url = resource_url
                    website_conf.website_url = website_url
                    db_session.add(website_conf)
                db_session.commit()
        return jsonify(result)
    except Exception as e:
        print traceback.format_exc(e)