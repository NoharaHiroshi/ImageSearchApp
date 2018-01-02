# coding:utf-8

import traceback
from flask import render_template, abort, g, jsonify, request
from flask import current_app as app

from model.session import get_session
from model.website.menu import WebsiteMenu
from model.image.image_series import ImageSeries

from route import website


@website.route('/website_menu_list', methods=['GET'])
def menu_list():
    result = {
        'response': 'ok',
        'menu_list': [],
    }
    try:
        _menu_list = list()
        _menu_list = WebsiteMenu.get_menu_select_info(_menu_list)
        result['menu_list'] = _menu_list
        return jsonify(result)
    except Exception as e:
        app.my_logger.error(traceback.format_exc(e))
        abort(400)


@website.route('/website_menu_list/detail', methods=['GET'])
def get_menu_detail():
    result = {
        'response': 'ok',
        'menu': '',
    }
    try:
        menu_id = request.args.get('id')
        menu_select_info = list()
        menu_select_info = WebsiteMenu.get_menu_select_info(menu_select_info)
        result['menu_select_info'] = menu_select_info
        result['all_series_list'] = ImageSeries.get_all_series()
        with get_session() as db_session:
            menu = db_session.query(WebsiteMenu).get(menu_id)
            if menu:
                menu_dict = menu.to_dict()
                result['menu'] = menu_dict
            else:
                result.update({
                    'response': 'fail',
                    'info': u'当前菜单不存在'
                })
        return jsonify(result)
    except Exception as e:
        app.my_logger.error(traceback.format_exc(e))
        abort(400)


@website.route('/website_menu_list/update', methods=['POST'])
def update_menu_detail():
    result = {
        'response': 'ok',
        'info': ''
    }
    try:
        menu_id = request.form.get('id')
        menu_name = request.form.get('name')
        parent_id = request.form.get('parent_id')
        icon_info = request.form.get('icon_info')
        menu_type = request.form.get('type')
        connect_id = request.form.get('connect_id')
        connect_name = request.form.get('connect_name')
        url = request.form.get('url')
        if None in [menu_name, parent_id, menu_type, connect_id]:
            result.update({
                'response': 'fail',
                'info': u'请检查参数是否填写完整'
            })
        else:
            with get_session() as db_session:
                if not menu_id:
                    menu = WebsiteMenu()
                    menu.name = menu_name
                    menu.parent_id = parent_id
                    menu.icon_info = icon_info
                    menu.connect_id = connect_id
                    menu.connect_name = connect_name
                    menu.type = menu_type
                    # 设置同层级菜单的排序位置
                    menu.sort = WebsiteMenu.set_count(parent_id)
                    menu.url = url
                    db_session.add(menu)
                else:
                    menu = db_session.query(WebsiteMenu).get(menu_id)
                    if menu:
                        menu.name = menu_name
                        menu.type = menu_type
                        menu.connect_id = connect_id
                        menu.connect_name = connect_name
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


@website.route('/website_menu_list/delete', methods=['POST'])
def delete_menu_detail():
    result = {
        'response': 'ok',
        'info': ''
    }
    try:
        ids = request.form.get('ids').split(',')
        if ids[0]:
            with get_session() as db_session:
                db_session.query(WebsiteMenu).filter(
                    WebsiteMenu.id.in_(ids)
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
@website.route('/website_menu_list/menu_sort_change', methods=['POST'])
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
                menu = db_session.query(WebsiteMenu).get(menu_id)
                if menu:
                    # 只能在同一层级中移动位置
                    if change_method == 'up':
                        _menu = db_session.query(WebsiteMenu).filter(
                            WebsiteMenu.parent_id == menu.parent_id,
                            WebsiteMenu.sort < menu.sort
                        ).first()
                        if _menu:
                            _sort = menu.sort
                            menu.sort = _menu.sort
                            _menu.sort = _sort
                        else:
                            result.update({
                                'response': 'fail',
                                'info': u'当前菜单已位于最顶端'
                            })
                    if change_method == 'down':
                        _menu = db_session.query(WebsiteMenu).filter(
                            WebsiteMenu.parent_id == menu.parent_id,
                            WebsiteMenu.sort > menu.sort
                        ).first()
                        if _menu:
                            _sort = menu.sort
                            menu.sort = _menu.sort
                            _menu.sort = _sort
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
