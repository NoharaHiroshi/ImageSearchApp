# encoding=utf-8

import traceback
import datetime
from flask import render_template, abort, g, redirect, url_for, request, jsonify, session
from sqlalchemy import or_, func, and_

from model.website.customer import Customer
from model.website.discount import Discount, CustomerDiscount
from model.session import get_session
from manage_app.views.website_index.route import website
from lib.aes_encrypt import AESCipher


@website.route('/customer_list', methods=['GET'])
def get_customer_list():
    result = {
        'response': 'ok',
        'customer_list': []
    }
    try:
        customer_list = list()
        with get_session() as db_session:
            customer_query = db_session.query(Customer).order_by(-Customer.created_date).all()
            if customer_query:
                for customer in customer_query:
                    customer_dict = customer.to_dict()
                    customer_list.append(customer_dict)
            result.update({
                'customer_list': customer_list
            })
        return jsonify(result)
    except Exception as e:
        print traceback.format_exc(e)


@website.route('/customer_list/detail', methods=['GET'])
def get_customer_detail():
    result = {
        'response': 'ok',
        'customer': '',
        'info': ''
    }
    try:
        _id = request.args.get('id')
        with get_session() as db_session:
            customer = db_session.query(Customer).get(_id)
            if customer:
                customer_dict = customer.to_dict()
                result.update({
                    'customer': customer_dict
                })
            else:
                result.update({
                    'response': 'fail',
                    'info': '当前会员不存在'
                })
        return jsonify(result)
    except Exception as e:
        print traceback.format_exc(e)


@website.route('/customer_list/update', methods=['POST'])
def update_customer_info():
    result = {
        'response': 'ok',
        'info': ''
    }
    try:
        _id = request.form.get('id')
        phone = request.form.get('phone')
        email = request.form.get('email')
        name = request.form.get('name')
        password = request.form.get('password')
        with get_session() as db_session:
            if not _id:
                if None in [email, name, password]:
                    result.update({
                        'response': 'fail',
                        'info': '请填写完整用户信息'
                    })
                else:
                    customer = Customer()
                    customer.phone = phone
                    customer.password = AESCipher.encrypt(password)
                    customer.email = email
                    customer.name = name
                    db_session.add(customer)
            else:
                customer = db_session.query(Customer).get(_id)
                if customer:
                    if password:
                        customer.password = AESCipher.encrypt(password)
                    customer.name = name
                    customer.email = email
                    customer.phone = phone
                else:
                    result.update({
                        'response': 'fail',
                        'info': '当前用户不存在'
                    })
            db_session.commit()
        return jsonify(result)
    except Exception as e:
        print traceback.format_exc(e)


@website.route('customer_list/delete', methods=['POST'])
def delete_customer():
    result = {
        'response': 'ok',
        'info': ''
    }
    try:
        ids = request.form.get('ids').split(',')
        if ids[0]:
            with get_session() as db_session:
                db_session.query(Customer).filter(
                    Customer.id.in_(ids)
                ).delete(synchronize_session=False)
                db_session.commit()
        else:
            result.update({
                'response': 'fail',
                'info': u'当前未选择任何会员'
            })
        return jsonify(result)
    except Exception as e:
        print traceback.format_exc(e)


@website.route('customer_list/get_discount', methods=['GET'])
def get_customer_discount():
    result = {
        'response': 'ok',
        'discount_list': [],
        'customer_discount': '',
        'info': ''
    }
    customer_id = request.args.get('customer_id')
    try:
        with get_session() as db_session:
            all_discount_list = list()
            all_discount = db_session.query(Discount).all()
            for discount in all_discount:
                discount_dict = discount.to_dict()
                all_discount_list.append(discount_dict)
            result['discount_list'] = all_discount_list
            customer_discount = db_session.query(CustomerDiscount).filter(
                CustomerDiscount.customer_id == customer_id
            ).first()
            if customer_discount:
                customer_discount_dict = customer_discount.to_dict()
                result['customer_discount'] = customer_discount_dict
        return jsonify(result)
    except Exception as e:
        print traceback.format_exc(e)


@website.route('/customer_list/set_discount', methods=['POST'])
def set_customer_discount():
    result = {
        'response': 'ok',
        'info': ''
    }
    customer_id = request.form.get('customer_id')
    discount_id = request.form.get('discount_id')
    try:
        now = datetime.datetime.now()
        with get_session() as db_session:
            customer_discount = db_session.query(CustomerDiscount).filter(
                CustomerDiscount.customer_id == customer_id
            ).first()
            discount = db_session.query(Discount).get(discount_id)
            if discount:
                if customer_discount:
                    customer_discount.type = CustomerDiscount.TYPE_MANUAL
                    # 如果当前用户已经购买了权益，并再次购买相同权益，则将生效时间累加
                    if str(customer_discount.discount_id) == str(discount_id):
                        customer_discount.effect_days += discount.effect_days
                    else:
                        # 如果用户要升级权益，则生效日期重置，旧的权益作废（如果是用户购买权益，则要根据level来防止用户降低权益）
                        customer_discount.discount_id = discount_id
                        customer_discount.effect_start = now
                        customer_discount.effect_days = discount.effect_days
                else:
                    customer_discount = CustomerDiscount()
                    customer_discount.discount_id = discount_id
                    customer_discount.effect_start = now
                    customer_discount.effect_days = discount.effect_days
                    db_session.add(customer_discount)
            else:
                result.update({
                    'response': 'fail',
                    'info': u'当前权益不存在'
                })
            db_session.commit()
        return jsonify(result)
    except Exception as e:
        print e
