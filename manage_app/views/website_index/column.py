# coding:utf-8

import traceback
from flask import render_template, abort, g, jsonify, request
from flask import current_app as app

from model.session import get_session
from model.image.image_series import ImageSeries
from model.website.column import WebsiteColumn, WebsiteColumnSeriesRel

from route import website


@website.route('/column_list', methods=['GET'])
def get_column_list():
    result = {
        'response': 'ok',
        'column_list': [],
    }
    try:
        with get_session() as db_session:
            query = db_session.query(WebsiteColumn).order_by(WebsiteColumn.ranking).all()
            _column_list = list()
            for column in query:
                column_dict = column.to_dict()
                _column_list.append(column_dict)
            result.update({
                'column_list': _column_list
            })
        return jsonify(result)
    except Exception as e:
        print e


@website.route('/column_list/detail', methods=['GET'])
def get_column_detail():
    result = {
        'response': 'ok',
        'info': '',
        'column': ''
    }
    _id = request.args.get('id')
    try:
        with get_session() as db_session:
            column = db_session.query(WebsiteColumn).get(_id)
            if column:
                column_dict = column.to_dict()
                result['column'] = column_dict
            else:
                result.update({
                    'response': 'fail',
                    'info': u'当前栏目不存在'
                })
        return jsonify(result)
    except Exception as e:
        print e


@website.route('/column_list/update', methods=['POST'])
def update_column():
    result = {
        'response': 'ok',
        'info': ''
    }
    column_id = request.form.get('id')
    name = request.form.get('name')
    sub_title = request.form.get('sub_title')
    ranking = request.form.get('ranking')
    try:
        if None in [name, ranking]:
            result.update({
                'response': 'fail',
                'info': u'请检查参数是否填写完整'
            })
        else:
            with get_session() as db_session:
                if not column_id:
                    column = WebsiteColumn()
                    column.name = name
                    column.sub_title = sub_title
                    column.ranking = ranking
                    db_session.add(column)
                else:
                    column = db_session.query(WebsiteColumn).get(column_id)
                    if column:
                        column.name = name
                        column.sub_title = sub_title
                        column.ranking = ranking
                    else:
                        result['response'] = 'fail'
                        result['info'] = u'当前对象不存在'
                db_session.commit()
        return jsonify(result)
    except Exception as e:
        print e


@website.route('/column_list/delete', methods=['POST'])
def delete_column():
    result = {
        'response': 'ok',
        'info': ''
    }
    try:
        ids = request.form.get('ids').split(',')
        if ids[0]:
            with get_session() as db_session:
                db_session.query(WebsiteColumn).filter(
                    WebsiteColumn.id.in_(ids)
                ).delete(synchronize_session=False)
                # 删除与之相关的专题表
                for _id in ids:
                    db_session.query(WebsiteColumnSeriesRel).filer(
                        WebsiteColumnSeriesRel.column_id == _id
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


@website.route('/column_list/set', methods=['GET'])
def get_column_set():
    result = {
        'response': 'ok',
        'info': '',
        'column': '',
        'column_series_rel_list': []
    }
    _id = request.args.get('id')
    try:
        with get_session() as db_session:
            column = db_session.query(WebsiteColumn).get(_id)
            if column:
                column_dict = column.to_dict()
                result['column'] = column_dict
                all_column_series_list = db_session.query(WebsiteColumnSeriesRel, ImageSeries).join(
                    ImageSeries, ImageSeries.id == WebsiteColumnSeriesRel.series_id
                ).filter(
                    WebsiteColumnSeriesRel.column_id == column.id
                ).all()
                for column_series, image_series in all_column_series_list:
                    column_series_rel = image_series.to_dict()
                    column_series_rel['id'] = str(column_series.id)
                    column_series_rel['type_text'] = column_series.type_text
                    result['column_series_rel_list'].append(column_series_rel)
            else:
                result.update({
                    'response': 'fail',
                    'info': u'当前栏目不存在'
                })
        return jsonify(result)
    except Exception as e:
        print e


@website.route('/column_list/set_update', methods=['POST'])
def set_update_column():
    result = {
        'response': 'ok',
        'info': ''
    }
    column_id = request.form.get('column_id')
    series_id_list = request.form.get('series_id_list')
    try:
        if None in [column_id, series_id_list]:
            result.update({
                'response': 'fail',
                'info': u'请检查参数是否填写完整'
            })
        else:
            ids = series_id_list.split(',')
            if ids[0]:
                with get_session() as db_session:
                    for series_id in ids:
                        column_series_rel = WebsiteColumnSeriesRel()
                        column_series_rel.column_id = column_id
                        column_series_rel.series_id = series_id
                        db_session.add(column_series_rel)
                    db_session.commit()
        return jsonify(result)
    except Exception as e:
        print e


@website.route('/column_list/set_delete', methods=['POST'])
def set_delete_column():
    result = {
        'response': 'ok',
        'info': ''
    }
    ids = request.form.get('ids').split(',')
    try:
        if ids[0]:
            with get_session() as db_session:
                db_session.query(WebsiteColumnSeriesRel).filter(
                    WebsiteColumnSeriesRel.id.in_(ids)
                ).delete(synchronize_session=False)
                db_session.commit()
        else:
            result.update({
                'response': 'fail',
                'info': u'当前未选择任何数据'
            })
        return jsonify(result)
    except Exception as e:
        print e


@website.route('/column_list/set_visible', methods=['POST'])
def set_visible_column():
    result = {
        'response': 'ok',
        'info': ''
    }
    ids = request.form.get('ids').split(',')
    try:
        if ids[0]:
            with get_session() as db_session:
                query = db_session.query(WebsiteColumnSeriesRel).filter(
                    WebsiteColumnSeriesRel.id.in_(ids)
                ).all()
                for column_rel in query:
                    column_rel.type = WebsiteColumnSeriesRel.TYPE_SHOW
                db_session.commit()
        else:
            result.update({
                'response': 'fail',
                'info': u'当前未选择任何数据'
            })
            return jsonify(result)
    except Exception as e:
        print e


@website.route('/column_list/set_hidden', methods=['POST'])
def set_hidden_column():
    result = {
        'response': 'ok',
        'info': ''
    }
    ids = request.form.get('ids').split(',')
    try:
        if ids[0]:
            with get_session() as db_session:
                query = db_session.query(WebsiteColumnSeriesRel).filter(
                    WebsiteColumnSeriesRel.id.in_(ids)
                ).all()
                for column_rel in query:
                    column_rel.type = WebsiteColumnSeriesRel.TYPE_HIDDEN
                db_session.commit()
        else:
            result.update({
                'response': 'fail',
                'info': u'当前未选择任何数据'
            })
            return jsonify(result)
    except Exception as e:
        print e