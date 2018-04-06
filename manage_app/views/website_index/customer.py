# encoding=utf-8

import traceback
from flask import render_template, abort, g, redirect, url_for, request, jsonify, session
from sqlalchemy import or_, func, and_

from model.website.customer import Customer
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