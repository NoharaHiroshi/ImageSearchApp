# coding:utf-8

import traceback
from flask import render_template, abort, g
from flask.ext.login import current_user
from flask import current_app as app
from model.session import get_session

from route import manage


@manage.route('/customer_login', methods=['GET'])
def login():
    try:
        pass
    except Exception as e:
        app.my_logger.error(traceback.format_exc(e))
        abort(400)