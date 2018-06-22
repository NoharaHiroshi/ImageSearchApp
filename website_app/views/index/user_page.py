# encoding=utf-8

from flask import render_template, abort, g, jsonify, request, session, redirect, url_for
from flask.ext.login import current_user, login_user, logout_user

from model.session import get_session
from model.website.customer import Customer

from route import index


@index.route('/user_info', methods=['GET'])
def user():
    result = {
        'customer': '',
        'info': ''
    }
    user_id = request.args.get('id')
    try:
        with get_session() as db_session:
            customer = db_session.query(Customer).get(user_id)
            if customer:
                customer_dict = customer.to_dict()
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
        'info': ''
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
                