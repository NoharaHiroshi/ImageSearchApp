# coding:utf-8

import traceback
from flask import render_template, abort, g, redirect, url_for, request, jsonify, session
from flask.ext.login import current_user, login_user, logout_user, login_required
from flask import current_app as app

from manage_app.config import config
from model.session import get_session
from model.manage.menu import Menu

from route import index


@index.route('/', methods=['GET'])
def main_index():
    try:
        return render_template('tpl/index.html')
    except Exception as e:
        print e