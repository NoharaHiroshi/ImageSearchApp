# coding:utf-8

import traceback
from flask import render_template, abort, g, jsonify, request
from flask.ext.login import current_user
from flask import current_app as app

from model.session import get_session
from model.manage.func import Func

from route import manage


@manage.route('/func_list', methods=['GET'])
def get_func_list():
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
def get_func_detail():
    result = {
        'response': 'ok',
        'func': ''
    }
    try:
        func_id = request.args.get('id')
        with get_session() as db_session:
            func = db_session.query(Func).get(func_id)
            if func:
                func_dict = func.to_dict()
                result['func'] = func_dict
        return jsonify(result)
    except Exception as e:
        app.my_logger.error(traceback.format_exc(e))
        abort(400)


@manage.route('/func_list/update', methods=['POST'])
def update_func_detail():
    result = {
        'response': 'ok',
        'info': ''
    }
    try:
        func_id = request.form.get('id')
        func_name = request.form.get('name')
        func_code = request.form.get('code')
        func_desc = request.form.get('desc')
        with get_session() as db_session:
            if not func_id:
                func = Func()
                func.name = func_name
                func.code = func_code
                func.desc = func_desc
                db_session.add(func)
            else:
                func = db_session.query(Func).get(func_id)
                if func:
                    func.name = func_name
                    func.code = func_code
                    func.desc = func_desc
                else:
                    result['response'] = 'fail'
                    result['info'] = '当前对象不存在'
            db_session.commit()
        return jsonify(result)
    except Exception as e:
        app.my_logger.error(traceback.format_exc(e))
        abort(400)


@manage.route('/func_list/delete', methods=['POST'])
def delete_func_detail():
    result = {
        'response': 'ok',
        'info': ''
    }
    try:
        ids = request.form.get('ids').split(',')
        if ids[0]:
            with get_session() as db_session:
                db_session.query(Func).filter(
                    Func.id.in_(ids)
                ).delete(synchronize_session=False)
                db_session.commit()
        else:
            result.update({
                'response': 'fail',
                'info': u'当前未选择任何数据'
            })
        return jsonify(result)
    except Exception as e:
        app.my_logger.error(traceback.format_exc(e))
        abort(400)