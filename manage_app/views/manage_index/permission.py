# coding:utf-8

import traceback
from flask import render_template, abort, g, jsonify, request
from flask.ext.login import current_user
from flask import current_app as app

from model.session import get_session
from model.manage.func import Func, MenuFunc
from model.manage.menu import Menu

from lib.permission_wrap import verify_permissions

from route import manage


@manage.route('/func_list', methods=['GET'])
@verify_permissions('func_conf_list')
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
@verify_permissions('func_conf_list')
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
@verify_permissions('func_conf_update')
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
        if None in [func_name, func_code]:
            result.update({
                'response': 'fail',
                'info': u'请检查参数是否填写完整'
            })
        else:
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
@verify_permissions('func_conf_delete')
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


@manage.route('/menu_func_list', methods=['GET'])
@verify_permissions('menu_func_conf_list')
def get_menu_func_list():
    result = {
        'response': 'ok',
        'menu_func_list': []
    }
    try:
        with get_session() as db_session:
            query = db_session.query(MenuFunc, Menu, Func).join(
                Menu, Menu.id == MenuFunc.menu_id
            ).join(
                Func, Func.id == MenuFunc.func_id
            ).order_by(Menu.sort).all()
            for menu_func, menu, func in query:
                menu_func_dict = menu_func.to_dict()
                menu_func_dict.update({
                    'menu_name': menu.name,
                    'func_name': func.name
                })
                result['menu_func_list'].append(menu_func_dict)
            return jsonify(result)
    except Exception as e:
        app.my_logger.error(traceback.format_exc(e))
        abort(400)


@manage.route('/menu_func_list/detail', methods=['GET'])
@verify_permissions('menu_func_conf_list')
def get_menu_func_detail():
    result = {
        'response': 'ok',
        'menu_func': ''
    }
    try:
        menu_func_id = request.args.get('id')
        menu_select_info = list()
        menu_select_info = Menu.get_menu_select_info(menu_select_info)
        result['menu_select_info'] = menu_select_info
        result['func_select_info'] = Func.get_func_select_info()
        with get_session() as db_session:
            menu_func = db_session.query(MenuFunc).get(menu_func_id)
            if menu_func:
                menu_func_dict = menu_func.to_dict()
                result['menu_func'] = menu_func_dict
        return jsonify(result)
    except Exception as e:
        app.my_logger.error(traceback.format_exc(e))
        abort(400)


@manage.route('/menu_func_list/update', methods=['POST'])
@verify_permissions('menu_func_conf_update')
def update_menu_func_detail():
    result = {
        'response': 'ok',
        'info': ''
    }
    try:
        menu_func_id = request.form.get('id')
        menu_func_name = request.form.get('name')
        menu_id = request.form.get('menu_id')
        func_id = request.form.get('func_id')
        menu_func_code = request.form.get('menu_func_code')
        if None in [menu_func_name] or 0 in [menu_id, func_id]:
            result.update({
                'response': 'fail',
                'info': u'请检查参数是否填写完整'
            })
        else:
            with get_session() as db_session:
                if not menu_func_id:
                    menu_func = MenuFunc()
                    menu_func.name = menu_func_name
                    menu_func.menu_id = menu_id
                    menu_func.func_id = func_id
                    menu_func.menu_func_code = menu_func_code
                    db_session.add(menu_func)
                else:
                    menu_func = db_session.query(MenuFunc).get(menu_func_id)
                    if menu_func:
                        menu_func.name = menu_func_name
                    else:
                        result['response'] = 'fail'
                        result['info'] = '当前对象不存在'
                db_session.commit()
        return jsonify(result)
    except Exception as e:
        app.my_logger.error(traceback.format_exc(e))
        abort(400)