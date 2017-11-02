# coding:utf-8

import traceback
from flask import render_template, abort, g, jsonify, request
from flask.ext.login import current_user
from flask import current_app as app

from model.session import get_session
from model.manage.menu import Menu

from route import manage


@manage.route('/nav', methods=['GET'])
def nav_list():
    result = {
        'response': 'ok',
        'menu_list': [],
        'menu_title': '系统管理'
    }
    try:
        with get_session() as db_session:
            all_parent_menu = db_session.query(Menu).filter(
                Menu.parent_id == 0
            ).order_by(Menu.sort).all()
            for parent_menu in all_parent_menu:
                parent_menu_dict = parent_menu.to_dict()
                result['menu_list'].append(parent_menu_dict)
        return jsonify(result)
    except Exception as e:
        app.my_logger.error(traceback.format_exc(e))
        abort(400)


@manage.route('/header', methods=['GET'])
def header_info():
    result = {
        'response': 'ok',
        'user': {}
    }
    try:
        if current_user.is_authenticated():
            user_dict = current_user.to_dcit()
            result['user'] = user_dict
        return jsonify(result)
    except Exception as e:
        app.my_logger.error(traceback.format_exc(e))
        abort(400)