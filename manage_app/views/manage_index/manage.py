# coding:utf-8

import traceback
from flask import render_template, abort, g
from flask.ext.login import current_user
from flask import current_app as app

from model.session import get_session

from route import manage


@manage.route('/', methods=['GET'])
def index():
    try:
        context = {'module': 'manage'}
        return render_template('tpl/manage_page.html', **context)
    except Exception as e:
        app.my_logger.error(traceback.format_exc(e))
        abort(400)


@manage.route('/login', methods=['GET'])
def login():
    try:
        context = {'module': 'manage'}
        return render_template('tpl/login.html', **context)
    except Exception as e:
        app.my_logger.error(traceback.format_exc(e))
        abort(400)