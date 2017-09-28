# coding:utf-8

import traceback
from flask import render_template, abort, g, jsonify
from flask import current_app as app

from model.session import get_session
from model.manage.menu import Menu

from route import manage


@manage.route('/nav', methods=['GET'])
def nav_list():
    result = {
        'response': 'ok',
        'menu_list': []
    }
    try:
        with get_session() as db_session:
            all_menu = db_session.query(Menu).all()
            for menu in all_menu:
                menu_dict = menu.to_dict()
                result['menu_list'].append(menu_dict)
        return jsonify(result)
    except Exception as e:
        app.my_logger.error(traceback.format_exc(e))
        abort(400)
