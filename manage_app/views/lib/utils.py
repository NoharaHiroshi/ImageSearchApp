# coding:utf-8

import os
import traceback

from flask import render_template, abort, g, redirect, url_for, request, jsonify, session
from lib.paginator import SQLAlchemyPaginator
from model.session import get_session

from manage_app.config import config
from PIL import Image as Img

from model.base import IdGenerator, HashName
from model.image.image import CommonImage
from model.image.image_series import ImageSeries
from model.image.image_series import ImageSeriesCategory
from model.image.image_tags import ImageRecommendTagsRel, ImageRecommendTags, ImageTags, ImageTagsRel
from model.website.column import WebsiteColumnSeriesRel

from route import lib


@lib.route('/get_all_series', methods=['GET'])
def get_all_series():
    result = {
        'response': 'ok',
        'meta': '',
        'data_list': []
    }
    search = request.args.get('search')
    limit = request.args.get('limit', 10)
    page = request.args.get('page', 1)
    with get_session() as db_session:
        query = db_session.query(ImageSeries).order_by(-ImageSeries.modified_date)

        if search:
            query = query.filter(
                ImageSeries.name.like('%%%s%%' % search)
            )

        paginator = SQLAlchemyPaginator(query, limit)
        page = paginator.get_validate_page(page)

        _data_list = list()

        for series in paginator.page(page):
            series_dict = series.to_dict()
            _data_list.append(series_dict)

        result['data_list'] = _data_list
        result.update({
            'meta': {
                'cur_page': page,
                'all_page': paginator.max_page,
                'count': paginator.count
            }
        })
    return jsonify(result)


# 主要用于栏目中防止专题的重复选择
@lib.route('/get_column_all_series', methods=['GET'])
def get_column_all_series():
    result = {
        'response': 'ok',
        'meta': '',
        'data_list': []
    }
    search = request.args.get('search')
    limit = request.args.get('limit', 10)
    page = request.args.get('page', 1)
    column_id = request.args.get('column_id')
    with get_session() as db_session:
        query = db_session.query(ImageSeries).order_by(-ImageSeries.modified_date)

        has_series_list = list()
        all_series = db_session.query(WebsiteColumnSeriesRel).filter(
            WebsiteColumnSeriesRel.column_id == column_id
        ).all()
        for series in all_series:
            has_series_list.append(series.series_id)
        query = query.filter(
            ImageSeries.id.notin_(has_series_list)
        )

        if search:
            query = query.filter(
                ImageSeries.name.like('%%%s%%' % search)
            )

        paginator = SQLAlchemyPaginator(query, limit)
        page = paginator.get_validate_page(page)

        _data_list = list()

        for series in paginator.page(page):
            series_dict = series.to_dict()
            _data_list.append(series_dict)

        result['data_list'] = _data_list
        result.update({
            'meta': {
                'cur_page': page,
                'all_page': paginator.max_page,
                'count': paginator.count
            }
        })
    return jsonify(result)


@lib.route('/get_all_series_category', methods=['GET'])
def get_all_series_category():
    result = {
        'response': 'ok',
        'meta': '',
        'data_list': []
    }
    search = request.args.get('search')
    limit = request.args.get('limit', 10)
    page = request.args.get('page', 1)
    with get_session() as db_session:
        query = db_session.query(ImageSeriesCategory).order_by(-ImageSeriesCategory.modified_date)

        if search:
            query = query.filter(
                ImageSeriesCategory.name.like('%%%s%%' % search)
            )

        paginator = SQLAlchemyPaginator(query, limit)
        page = paginator.get_validate_page(page)

        _data_list = list()

        for series_category in paginator.page(page):
            series_category_dict = series_category.to_dict()
            _data_list.append(series_category_dict)

        result['data_list'] = _data_list
        result.update({
            'meta': {
                'cur_page': page,
                'all_page': paginator.max_page,
                'count': paginator.count
            }
        })
    return jsonify(result)


@lib.route('/get_all_tags', methods=['GET'])
def get_all_tag():
    result = {
        'response': 'ok',
        'meta': '',
        'data_list': []
    }
    search = request.args.get('search')
    limit = request.args.get('limit', 10)
    page = request.args.get('page', 1)
    with get_session() as db_session:
        query = db_session.query(ImageTags).order_by(-ImageTags.created_date)

        if search:
            query = query.filter(
                ImageTags.name.like('%%%s%%' % search)
            )

        paginator = SQLAlchemyPaginator(query, limit)
        page = paginator.get_validate_page(page)

        _data_list = list()

        for tag in paginator.page(page):
            tag_dict = tag.to_dict()
            _data_list.append(tag_dict)

        result['data_list'] = _data_list
        result.update({
            'meta': {
                'cur_page': page,
                'all_page': paginator.max_page,
                'count': paginator.count
            }
        })
    return jsonify(result)


@lib.route('/editor/upload_image', methods=['POST'])
def upload_article_image():
    result = {
        'state': 'ok'
    }
    f = request.files['upload']
    try:
        with get_session() as db_session:
            _id = IdGenerator.gen()
            original_name = HashName.gen(_id, info="common")
            file_name = f.filename
            upload_src = config.IMG_UPLOAD_SRC
            # 图像处理
            im = Img.open(f)
            # 长宽
            width, height = im.size
            # 格式
            file_format = im.format
            # 模式
            file_full_path = os.path.join(upload_src, 'common',
                                          '.'.join([original_name, file_format.lower()])).replace('\\', '/')
            mode = im.mode
            im.save(file_full_path)
            # 数据库存储
            img = CommonImage()
            img.id = _id
            img.name = file_name
            img.url = original_name
            img.format = file_format
            img.width = width
            img.mode = mode
            img.height = height
            db_session.add(img)
            result.update({
                'id': str(_id),
                'fileName': f.filename,
                'name': original_name,
                'original': original_name,
                'src': img.img_full_url,
                'type': '.%s' % img.format,
                'url': config.MANAGE_URL + '/static/' + img.img_full_url,
                'uploaded': 1
            })
            db_session.commit()
    except Exception as e:
        print traceback.format_exc(e)
        result.update({
            'state': 'fail'
        })
    return jsonify(result)