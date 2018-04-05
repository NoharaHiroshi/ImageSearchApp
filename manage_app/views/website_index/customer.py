# encoding=utf-8

import traceback
from flask import render_template, abort, g, redirect, url_for, request, jsonify, session

from model.website.customer import Customer
from model.session import get_session
from manage_app.views.website_index.route import website


@website.route('/customer_list', methods=['GET'])
def get_customer_list():
    result = {
        'response': 'ok',
        'customer_list': []
    }
    try:
        customer_list = list()
        with get_session() as db_session:
            customer_query = db_session.query(Customer).all()
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