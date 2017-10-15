# coding:utf-8

import traceback
from flask import render_template, abort, g, jsonify, request
from flask.ext.login import current_user
from flask import current_app as app

from model.session import get_session
from model.manage.func import Func

from route import manage


@manage.route('/func_list', methods=['GET'])
def func_list():
    result = {
        'response': 'ok',
        'func_list': []
    }
    try:
        with get_session() as db_session:
            all_func = db_session.query(Func).all()
            for func in all_func:
                func_dict = func.to_dict()
                result['func_list'].append(func_dict)
            return jsonify(result)
    except Exception as e:
        app.my_logger.error(traceback.format_exc(e))
        abort(400)


@manage.route('/func_list/detail', methods=['GET'])
def func_detail():
    result = {
        'response': 'ok',
        'func': ''
    }
    try:
        func_id = request.args.get('id')
        print func_id
        with get_session() as db_session:
            func = db_session.query(Func).get(func_id)
            if func:
                func_dict = func.to_dict()
                result['func'] = func_dict
        return jsonify(result)
    except Exception as e:
        app.my_logger.error(traceback.format_exc(e))
        abort(400)
