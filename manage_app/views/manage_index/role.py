# coding:utf-8

import traceback
import ujson
from flask import render_template, abort, g, jsonify, request
from flask.ext.login import current_user
from flask import current_app as app

from model.session import get_session
from model.manage.role import Role, UserRole
from model.manage.menu import Menu
from model.manage.func import MenuFunc
from model.manage.user import User
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
        'all_menu_func_list': list(),
        'all_role_permission_list': list()
    }
    try:
        role_id = request.args.get('id')
        with get_session() as db_session:
            # 角色信息
            role = db_session.query(Role).get(role_id)
            role_dict = role.to_dict()
            result['role'] = role_dict

            # 菜单信息
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

            # 角色权限信息
            role_all_permission = db_session.query(RolePermissionRel).filter(
                RolePermissionRel.role_id == role_id
            ).all()
            all_role_permission_list = list()
            for role_permission in role_all_permission:
                all_role_permission_list.append(str(role_permission.menu_func_id))
            result['all_role_permission_list'] = all_role_permission_list
        return jsonify(result)
    except Exception as e:
        app.my_logger.error(traceback.format_exc(e))
        abort(400)


@manage.route('/role_list/permission/update', methods=['POST'])
@verify_permissions('role_conf_update')
def update_role_permission_detail():
    result = {
        'response': 'ok',
    }
    role_id = request.form.get('id')
    role_selected_nodes = request.form.get('selected_nodes', '[]')
    try:
        with get_session() as db_session:
            role_selected_nodes = ujson.loads(role_selected_nodes)
            if role_selected_nodes:
                update_ids = [role_selected_node.get('menu_id') for role_selected_node in role_selected_nodes]
            else:
                update_ids = []

            all_has_permission = db_session.query(RolePermissionRel).filter(
                RolePermissionRel.role_id == role_id
            ).all()
            if all_has_permission:
                has_ids = [str(has_permission.menu_func_id) for has_permission in all_has_permission]
            else:
                has_ids = []

            del_ids = set(has_ids) - set(update_ids)

            # 删除
            db_session.query(RolePermissionRel).filter(
                RolePermissionRel.role_id == role_id,
                RolePermissionRel.menu_func_id.in_(del_ids)
            ).delete(synchronize_session=False)

            for node in role_selected_nodes:
                # 只记录功能id（menu_func）
                if not node.get('is_menu', True):
                    role_permission = db_session.query(RolePermissionRel).filter(
                        RolePermissionRel.role_id == role_id,
                        RolePermissionRel.menu_func_id == node.get('menu_id')
                    ).first()
                    if not role_permission:
                        role_permission = RolePermissionRel()
                        role_permission.role_id = role_id
                        role_permission.menu_func_id = node.get('menu_id')
                        role_permission.menu_func_name = node.get('name')
                        db_session.add(role_permission)
            db_session.commit()
        return jsonify(result)
    except Exception as e:
        app.my_logger.error(traceback.format_exc(e))
        abort(400)


@manage.route('/user_role_list', methods=['GET'])
@verify_permissions('user_role_conf_list')
def get_user_role_list():
    result = {
        'response': 'ok',
        'user_role_list': []
    }
    try:
        with get_session() as db_session:
            all_user_role_list = list()
            # 所有有权限的用户
            all_role_user = db_session.query(UserRole).group_by(
                UserRole.user_id
            ).all()
            for role_user in all_role_user:
                # 用户实例
                user = db_session.query(User).get(role_user.user_id)
                user_dict = user.to_dict()
                # 用户角色
                user_roles = db_session.query(UserRole, Role).join(
                    Role, Role.id == UserRole.role_id
                ).filter(
                    UserRole.user_id == user.id
                ).all()
                user_role_list = list()
                for user_role, role in user_roles:
                    role_dict = role.to_dict()
                    user_role_list.append(role_dict)
                user_dict['roles'] = user_role_list
                all_user_role_list.append(user_dict)
            result['user_role_list'] = all_user_role_list
            return jsonify(result)
    except Exception as e:
        print e
        abort(400)


@manage.route('/user_role_list/detail', methods=['GET'])
@verify_permissions('user_role_conf_list')
def get_user_role_detail():
    result = {
        'response': 'ok',
        'user_role': '',
        'all_user_info': [],
        'all_role_info': []
    }
    try:
        user_id = request.args.get('id')
        result['all_role_info'] = Role.get_all_role()
        result['all_user_info'] = User.get_all_user()
        with get_session() as db_session:
            user = db_session.query(User).get(user_id)
            if user:
                all_user_role = db_session.query(UserRole, Role).join(
                    Role, UserRole.role_id == Role.id
                ).filter(
                    UserRole.user_id == user_id
                ).all()
                user_role_list = list()
                for user_role, role in all_user_role:
                    role_dict = role.to_dict()
                    user_role_list.append(role_dict)
                user_dict = user.to_dict()
                user_dict['roles'] = user_role_list
                result['user_role'] = user_dict
        return jsonify(result)
    except Exception as e:
        print e
        abort(400)