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
    user_id = request.args.get(id)
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