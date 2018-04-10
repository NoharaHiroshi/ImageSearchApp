# encoding=utf-8

import traceback
from flask import render_template, abort, g, redirect, url_for, request, jsonify, session
from sqlalchemy import or_, func, and_

from model.website.customer import Customer
from model.website.discount import Discount
from model.session import get_session
from manage_app.views.website_index.route import website


@website.route('/discount_list', methods=['GET'])
def get_discount_list():
    result = {
        'response': 'ok',
        'discount_list': []
    }
    try:
        discount_list = list()
        with get_session() as db_session:
            all_discount = db_session.query(Discount).order_by(-Discount.created_date).all()
            for discount in all_discount:
                discount_dict = discount.to_dict()
                discount_list.append(discount_dict)
            result.update({
                'discount_list': discount_list
            })
    except Exception as e:
        print traceback.format_exc(e)


@website.route('/discount_list/detail', methods=['GET'])
def get_disocunt():
    result = {
        'response': 'ok',
        'discount': '',
        'info': ''
    }
    try:
        _id = request.args.get('id')
        with get_session() as db_session:
            discount = db_session.query(Discount).get(_id)
            if discount:
                discount_dict = discount.to_dict()
                result.update({
                    'discount': discount_dict
                })
            else:
                result.update({
                    'response': 'fail',
                    'info': '当前权益不存在'
                })
        return jsonify(result)
    except Exception as e:
        print traceback.format_exc(e)