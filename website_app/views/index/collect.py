# encoding=utf-8

from flask import render_template, abort, g, jsonify, request, session, redirect, url_for
from flask.ext.login import current_user, login_user, logout_user
from lib.login_required import login_required
from model.session import get_session
from model.website.customer import Customer, CustomerCollect
from model.image.image import Image

from route import index


@index.route('/add_collect', methods=['GET'])
@login_required
def add_collect():
    result = {
        'response': 'ok',
        'info': ''
    }
    collect_id = request.args.get('collect_id')
    user_id = current_user.id
    t = request.args.get('type', 0)
    try:
        with get_session() as db_session:
            if int(t) == CustomerCollect.TYPE_IMAGE:
                customer_collect = db_session.query(CustomerCollect).filter(
                    CustomerCollect.customer_id == current_user.id,
                    CustomerCollect.collect_id == collect_id,
                    CustomerCollect.type == CustomerCollect.TYPE_IMAGE
                ).first()
                if not customer_collect:
                    img = db_session.query(Image).get(collect_id)
                    if img:
                        img.collect_count += 1

                        customer_collect = CustomerCollect()
                        customer_collect.collect_id = collect_id
                        customer_collect.customer_id = user_id
                        customer_collect.type = CustomerCollect.TYPE_IMAGE
                        db_session.add(customer_collect)
                    else:
                        result.update({
                            'response': 'fail',
                            'info': u'当前图片不存在'
                        })
                else:
                    result.update({
                        'response': 'fail',
                        'info': u'当前图片已收藏'
                    })
            db_session.commit()
        return jsonify(result)
    except Exception as e:
        print e


@index.route('/add_series_collect', methods=['GET'])
@login_required
def add_series_collect():
    result = {
        'response': 'ok',
        'info': ''
    }