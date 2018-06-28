# encoding=utf-8

import datetime

from flask import render_template, abort, g, jsonify, request, session, redirect, url_for
from flask.ext.login import current_user, login_user, logout_user

from model.session import get_session
from model.website.customer import Customer
from model.website.discount_code import DiscountCode, DisocuntCodeGenHistory
from model.website.discount import Discount, CustomerDiscount

from lib.login_required import login_required

from route import index


@index.route('/user_info', methods=['GET'])
@login_required
def user():
    result = {
        'response': 'ok',
        'customer': '',
        'customer_discount': '',
        'info': ''
    }
    try:
        if current_user.is_authenticated():
            with get_session() as db_session:
                user_discount = db_session.query(CustomerDiscount).filter(
                    CustomerDiscount.customer_id == current_user.id
                ).first()
                if user_discount:
                    discount = db_session.query(Discount).get(user_discount.discount_id)
                    if discount:
                        customer_discount_dict = user_discount.to_dict()
                        customer_discount_dict['effect_end'] = user_discount.effect_start + datetime.timedelta(
                            int(user_discount.effect_days))
                        customer_discount_dict['discount_name'] = discount.name
                        result.update({
                            'customer_discount': customer_discount_dict
                        })
                customer_dict = current_user.to_dict()
                result.update({
                    'customer': customer_dict
                })
        return jsonify(result)
    except Exception as e:
        print e


@index.route('/update_user_info', methods=['POST'])
def update_user():
    result = {
        'response': 'ok',
        'info': u'修改信息成功'
    }
    c_id = request.form.get('id', None)
    name = request.form.get('name', None)
    qq = request.form.get('qq', None)
    sex = request.form.get('sex', Customer.UNKNOWN)
    try:
        with get_session() as db_session:
            customer = db_session.query(Customer).get(c_id)
            if customer:
                customer.name = name
                customer.sex = sex
                customer.qq = qq
                db_session.commit()
            else:
                result.update({
                    'response': 'fail',
                    'info': u'当前用户不存在'
                })
        return jsonify(result)
    except Exception as e:
        print e