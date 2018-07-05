# coding:utf-8

import traceback
import ujson
import os
from sqlalchemy import or_
from flask import render_template, abort, g, jsonify, request, session, redirect, url_for
from flask.ext.login import current_user, login_user, logout_user
from lib.paginator import SQLAlchemyPaginator

from model.session import get_session
from model.image.image_series import ImageSeries, ImageSeriesCategoryRel, ImageSeriesCategory, ImageSeriesRel
from model.image.image import Image
from model.image.image_tags import ImageTags, ImageTagsRel,ImageRecommendTagsRel, ImageRecommendTags, ImageAssociationTag
from model.website.customer import CustomerCollect

from route import index


@index.route('/series_list_page', methods=['GET'])
def get_series_list_page():
    result = {
        'response': 'ok',
        'series_category': '',
        'series_list': []
    }
    # 当前connect_id为专题分类id
    connect_id = request.args.get('id')
    page = request.args.get('page', 1)
    limit = 12
    try:
        with get_session() as db_session:
            image_series_category = db_session.query(ImageSeriesCategory).get(connect_id)
            image_series_category_dict = image_series_category.to_dict()
            result['series_category'] = image_series_category_dict

            query = db_session.query(ImageSeriesCategoryRel).join(
                ImageSeriesCategory, ImageSeriesCategory.id == ImageSeriesCategoryRel.category_id
            ).filter(
                ImageSeriesCategory.id == connect_id
            ).all()
            image_series_ids = [image_series_category_rel.series_id for image_series_category_rel in query]
            query = db_session.query(ImageSeries).filter(
                ImageSeries.id.in_(image_series_ids)
            ).order_by(-ImageSeries.created_date)

            paginator = SQLAlchemyPaginator(query, limit)
            page = paginator.get_validate_page(page)

            _image_series_list = list()
            for image_series in paginator.page(page):
                image_series_dict = image_series.to_dict()
                image_series_dict['is_collected'] = False
                if current_user.is_authenticated():
                    image_collect = db_session.query(CustomerCollect).filter(
                        CustomerCollect.collect_id == image_series.id,
                        CustomerCollect.customer_id == current_user.id,
                        CustomerCollect.type == CustomerCollect.TYPE_SERIES
                    ).first()
                    if image_collect:
                        image_series_dict['is_collected'] = True
                width, height = image_series.get_cover_img_info()
                image_series_dict['width'] = width
                image_series_dict['height'] = height
                _image_series_list.append(image_series_dict)
            result['series_list'] = _image_series_list
            result.update({
                'meta': {
                    'cur_page': page,
                    'all_page': paginator.max_page,
                    'count': paginator.count
                }
            })
        return jsonify(result)
    except Exception as e:
        print e


@index.route('/image_list_page', methods=['GET'])
def get_image_list_page():
    result = {
        'response': 'ok',
        'image_series': '',
        'image_list': []
    }
    # 当前connect_id为专题id
    connect_id = request.args.get('id')
    page = request.args.get('page', 1)
    limit = 20
    try:
        with get_session() as db_session:
            image_series = db_session.query(ImageSeries).get(connect_id)
            if image_series:
                image_series_dict = image_series.to_dict()
                result['image_series'] = image_series_dict

                query = db_session.query(ImageSeriesRel).join(
                    ImageSeries, ImageSeries.id == ImageSeriesRel.image_series_id
                ).filter(
                    ImageSeries.id == connect_id
                ).all()

                image_ids = [image_rel.image_id for image_rel in query]
                query = db_session.query(Image).filter(
                    Image.id.in_(image_ids)
                ).order_by(-Image.created_date)

                paginator = SQLAlchemyPaginator(query, limit)
                page = paginator.get_validate_page(page)

                _image_list = list()
                for image in paginator.page(page):
                    image_dict = image.to_dict()
                    _image_list.append(image_dict)
                result['image_list'] = _image_list
                result.update({
                    'meta': {
                        'cur_page': page,
                        'all_page': paginator.max_page,
                        'count': paginator.count
                    }
                })
        return jsonify(result)
    except Exception as e:
        print e


@index.route('/filter_image_list', methods=['GET'])
def get_filter_image_list():
    result = {
        'response': 'ok',
        'info': '',
        'image_list': [],
        'all_image_format': [],
        'recommend_tag_list': []
    }
    # 搜索条件是按照标签进行搜索
    search = request.args.get('search', '')
    page = request.args.get('page', 1)
    image_format = request.args.get('format', u'all')
    selected_sort = request.args.get('sort', u'created_date')
    limit = 20
    try:
        all_selected_images = list()
        all_image_format = Image.all_image_format()
        all_image_sort_dict = Image.all_image_sort()
        all_image_sort = [sort for sort in all_image_sort_dict]
        all_image_sort_str = [sort_str for sort_str in all_image_sort_dict.values()]
        with get_session() as db_session:
            # 根据用户搜索条件查询推荐标签分组
            recommend_tag_list = list()
            association_tag = db_session.query(ImageAssociationTag).filter(
                ImageAssociationTag.name.like('%' + search + '%')
            ).first()
            main_tag = db_session.query(ImageTags).filter(
                ImageTags.name.like('%' + search + '%')
            ).first()
            if association_tag or main_tag:
                tag_id = association_tag.tag_id if association_tag else main_tag.id
                # 推荐标签组
                recommend_tags = db_session.query(ImageRecommendTagsRel).filter(
                    ImageRecommendTagsRel.tag_id == tag_id
                ).all()
                for recommend_tag in recommend_tags:
                    recommend_another_tags = db_session.query(ImageTags).join(
                        ImageRecommendTagsRel, ImageRecommendTagsRel.tag_id == ImageTags.id
                    ).filter(
                        ImageRecommendTagsRel.recommend_tag_id == recommend_tag.recommend_tag_id
                    ).all()
                    for recommend_another_tag in recommend_another_tags:
                        if recommend_another_tag.name not in recommend_tag_list:
                            recommend_tag_list.append(recommend_another_tag.name)

                image_query = db_session.query(ImageTagsRel).filter(
                    ImageTagsRel.tag_id == tag_id
                ).all()

                # 搜索关键词
                tag = db_session.query(ImageTags).filter(
                    ImageTags.id == tag_id
                ).first()
                if tag:
                    tag.view_count += 1
                db_session.commit()

                image_ids = [image_tag.image_id for image_tag in image_query]
                query = db_session.query(Image).filter(
                    Image.id.in_(image_ids)
                )
                # 图片格式
                if image_format != u'all':
                    query = query.filter(
                        Image.format == image_format
                    )
                # 图片排序
                if selected_sort == u'created_date':
                    query = query.order_by(-Image.created_date)
                elif selected_sort == u'recommend':
                    query = query.filter(
                        Image.is_recommend == True
                    ).order_by(-Image.created_date)
                elif selected_sort == u'download':
                    query = query.order_by(-Image.download_count)
                elif selected_sort == u'view':
                    query = query.order_by(-Image.view_count)

                search_count = query.count() if query.count() else 0
                paginator = SQLAlchemyPaginator(query, limit)
                page = paginator.get_validate_page(page)

                for tag_image in paginator.page(page):
                    tag_image_dict = tag_image.to_dict()
                    all_selected_images.append(tag_image_dict)
                result.update({
                    'image_list': all_selected_images,
                    'search': search,
                    'search_count': search_count,
                    'all_image_format': all_image_format,
                    'all_image_sort': all_image_sort,
                    'all_image_sort_str': all_image_sort_str,
                    'recommend_tag_list': recommend_tag_list,
                    'meta': {
                        'cur_page': page,
                        'all_page': paginator.max_page,
                        'count': paginator.count
                    }
                })
        return jsonify(result)
    except Exception as e:
        print e
