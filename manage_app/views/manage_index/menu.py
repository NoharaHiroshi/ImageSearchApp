# coding:utf-8

import traceback
from flask import render_template, abort, g, jsonify, request
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


# 获取带有前缀的菜单列表
def get_menu_select_info(menu_select_info=list(), parent_id=0, level=0):
    with get_session() as db_session:
        menus = db_session.query(Menu).filter(
            Menu.parent_id == parent_id
        ).order_by(Menu.sort).all()
        for menu in menus:
            if menu:
                menu_dict = menu.to_dict()
                menu_dict.update({
                    'menu_name': ''.join(['| ', '---- '*level, menu.name]),
                })
                menu_select_info.append(menu_dict)
                _level = level + 1
                get_menu_select_info(menu_select_info, menu.id, _level)
            else:
                continue
    return menu_select_info


@manage.route('/menu_list', methods=['GET'])
def menu_list():
    result = {
        'response': 'ok',
        'menu_list': [],
    }
    try:
        _menu_list = list()
        _menu_list = get_menu_select_info(_menu_list)
        result['menu_list'] = _menu_list
        return jsonify(result)
    except Exception as e:
        app.my_logger.error(traceback.format_exc(e))
        abort(400)


@manage.route('/menu_list/detail', methods=['GET'])
def get_menu_detail():
    result = {
        'response': 'ok',
        'menu': '',
    }
    try:
        func_id = request.args.get('id')
        menu_select_info = list()
        menu_select_info = get_menu_select_info(menu_select_info)
        result['menu_select_info'] = menu_select_info
        with get_session() as db_session:
            menu = db_session.query(Menu).get(func_id)
            if menu:
                menu_dict = menu.to_dict()
                result['menu'] = menu_dict
        return jsonify(result)
    except Exception as e:
        app.my_logger.error(traceback.format_exc(e))
        abort(400)


@manage.route('/menu_list/update', methods=['POST'])
def update_menu_detail():
    result = {
        'response': 'ok',
        'info': ''
    }
    try:
        menu_id = request.form.get('id')
        menu_name = request.form.get('name')
        menu_code = request.form.get('code')
        parent_id = request.form.get('parent_id')
        icon_info = request.form.get('icon_info')
        url = request.form.get('url')
        if None in [menu_id, menu_name, menu_code, parent_id]:
            result.update({
                'response': 'fail',
                'info': u'请检查参数是否填写完整'
            })
        else:
            with get_session() as db_session:
                if not menu_id:
                    menu = Menu()
                    menu.name = menu_name
                    menu.code = menu_code
                    menu.parent_id = parent_id
                    menu.icon_info = icon_info
                    # 设置同层级菜单的排序位置
                    menu.sort = Menu.set_count(parent_id)
                    menu.url = url
                    db_session.add(menu)
                else:
                    menu = db_session.query(Menu).get(menu_id)
                    if menu:
                        menu.name = menu_name
                        menu.code = menu_code
                        menu.parent_id = parent_id
                        menu.icon_info = icon_info
                        menu.url = url
                    else:
                        result['response'] = 'fail'
                        result['info'] = u'当前对象不存在'
                db_session.commit()
        return jsonify(result)
    except Exception as e:
        app.my_logger.error(traceback.format_exc(e))
        abort(400)


@manage.route('/menu_list/delete', methods=['POST'])
def delete_menu_detail():
    result = {
        'response': 'ok',
        'info': ''
    }
    try:
        ids = request.form.get('ids').split(',')
        if ids[0]:
            with get_session() as db_session:
                db_session.query(Menu).filter(
                    Menu.id.in_(ids)
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


# 调整菜单排序
@manage.route('/menu_list/menu_sort_change', methods=['POST'])
def change_menu_sort():
    result = {
        'response': 'ok',
        'info': ''
    }
    try:
        menu_id = request.form.get('menu_id')
        change_method = request.form.get('change_method')
        with get_session() as db_session:
            if None in [menu_id, change_method]:
                result.update({
                    'response': 'fail',
                    'info': u'请检查参数是否填写完整'
                })
            else:
                menu = db_session.query(Menu).get(menu_id)
                if menu:
                    # 只能在同一层级中移动位置
                    if change_method == 'up':
                        _menu = db_session.query(Menu).filter(
                            Menu.parent_id == menu.parent_id,
                            Menu.sort < menu.sort
                        ).first()
                        if _menu:
                            menu.sort, _menu_sort = _menu.sort, menu.sort
                        else:
                            result.update({
                                'response': 'fail',
                                'info': u'当前菜单已位于最顶端'
                            })
                    if change_method == 'down':
                        _menu = db_session.query(Menu).filter(
                            Menu.parent_id == menu.parent_id,
                            Menu.sort > menu.sort
                        ).first()
                        if _menu:
                            menu.sort, _menu_sort = _menu.sort, menu.sort
                        else:
                            result.update({
                                'response': 'fail',
                                'info': u'当前菜单已位于最底端'
                            })
                    db_session.commit()
                else:
                    result.update({
                        'response': 'fail',
                        'info': u'获取当前对象失败'
                    })
        return jsonify(result)
    except Exception as e:
        app.my_logger.error(traceback.format_exc(e))
        abort(400)
