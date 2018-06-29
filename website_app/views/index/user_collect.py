# encoding=utf-8

import datetime

from flask import render_template, abort, g, jsonify, request, session, redirect, url_for
from flask.ext.login import current_user, login_user, logout_user

from model.session import get_session
from model.website.customer import CustomerCollect, Customer
from model.image.image import Image

from lib.paginator import SQLAlchemyPaginator
from lib.login_required import login_required

from route import index


@index.route('/user_collect', methods=['GET'])
@login_required
def get_user_collect():
    result = {
        'response': 'ok',
        'info': '',
        'image_list': []
    }
    try:
        page = request.args.get('page', 1)
        with get_session() as db_session:
            limit = 20
            query = db_session.query(Image).outerjoin(
                CustomerCollect, Image.id == CustomerCollect.collect_id
            ).filter(
                CustomerCollect.customer_id == current_user.id,
                CustomerCollect.type == CustomerCollect.TYPE_IMAGE,
            )
            paginator = SQLAlchemyPaginator(query, limit)
            page = paginator.get_validate_page(page)
            for image in paginator.page(page):
                image_dict = image.to_dict()
                result['image_list'].append(image_dict)
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

