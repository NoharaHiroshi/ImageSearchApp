# coding:utf-8

import traceback
from flask import render_template, abort, g, jsonify, request
from flask.ext.login import current_user
from flask import current_app as app

from model.session import get_session
from model.manage.role import Role
from model.manage.menu import Menu
from model.manage.func import MenuFunc
from model.manage.permission import RolePermissionRel

from lib.permission_wrap import verify_permissions

from route import manage


@manage.route('/role_list', methods=['GET'])
@verify_permissions('role_conf_list')
def get_role_list():
    result = {
        'response': 'ok',
        'role_list': []
    }
    try:
        with get_session() as db_session:
            all_role = db_session.query(Role).all()
            for role in all_role:
                role_dict = role.to_dict()
                result['role_list'].append(role_dict)
            return jsonify(result)
    except Exception as e:
        app.my_logger.error(traceback.format_exc(e))
        abort(400)


@manage.route('/role_list/detail', methods=['GET'])
@verify_permissions('role_conf_list')
def get_role_detail():
    result = {
        'response': 'ok',
        'role': []
    }
    try:
        role_id = request.args.get('id')
        with get_session() as db_session:
            role = db_session.query(Role).get(role_id)
            if role:
                role_dict = role.to_dict()
                result['role'] = role_dict
        return jsonify(result)
    except Exception as e:
        app.my_logger.error(traceback.format_exc(e))
        abort(400)


@manage.route('/role_list/update', methods=['POST'])
@verify_permissions('role_conf_update')
def update_role_detail():
    result = {
        'response': 'ok',
        'info': ''
    }
    try:
        role_id = request.form.get('id')
        role_name = request.form.get('name')
        role_desc = request.form.get('desc')
        if None in [role_name]:
            result.update({
                'response': 'fail',
                'info': u'请检查参数是否填写完整'
            })
        else:
            with get_session() as db_session:
                if not role_id:
                    role = Role()
                    role.name = role_name
                    role.desc = role_desc
                    db_session.add(role)
                else:
                    role = db_session.query(Role).get(role_id)
                    if role:
                        role.name = role_name
                        role.desc = role_desc
                    else:
                        result['response'] = 'fail'
                        result['info'] = '当前对象不存在'
                db_session.commit()
        return jsonify(result)
    except Exception as e:
        app.my_logger.error(traceback.format_exc(e))
        abort(400)


@manage.route('/role_list/delete', methods=['POST'])
@verify_permissions('role_conf_delete')
def delete_role_detail():
    result = {
        'response': 'ok',
        'info': ''
    }
    try:
        ids = request.form.get('ids').split(',')
        if ids[0]:
            with get_session() as db_session:
                db_session.query(Role).filter(
                    Role.id.in_(ids)
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


@manage.route('/role_list/permission/detail', methods=['GET'])
@verify_permissions('role_conf_update')
def get_role_permission_detail():
    result = {
        'response': 'ok',
        'role': '',
        'all_menu_func_list': list()
    }
    try:
        role_id = request.args.get('id')
        with get_session() as db_session:
            role = db_session.query(Role).get(role_id)
            role_dict = role.to_dict()
            result['role'] = role_dict

            all_menu = db_session.query(Menu).filter(
                Menu.parent_id == 0
            ).all()
            all_menu_list = list()
            for menu in all_menu:
                menu_dict = menu.to_dict()
                sub_menus = menu_dict.get('sub_menus')
                for sub_menu in sub_menus:
                    all_sub_menu_func = db_session.query(MenuFunc).filter(
                        MenuFunc.menu_id == sub_menu.get('id')
                    ).all()
                    sub_menu_func_list = list()
                    for sub_menu_func in all_sub_menu_func:
                        sub_menu_func_dict = sub_menu_func.to_dict()
                        sub_menu_func_list.append(sub_menu_func_dict)
                    sub_menu['all_sub_menu_func'] = sub_menu_func_list
                all_menu_list.append(menu_dict)
            result['all_menu_func_list'] = all_menu_list
        return jsonify(result)
    except Exception as e:
        app.my_logger.error(traceback.format_exc(e))
        abort(400)