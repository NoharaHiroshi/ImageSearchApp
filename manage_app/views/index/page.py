# coding:utf-8

import traceback
from flask import render_template, abort, g, jsonify, request
from flask.ext.login import current_user
from flask import current_app as app

from manage_app.config import config
from model.session import get_session
from model.manage.menu import Menu

from route import index


@index.route('/header', methods=['GET'])
def get_header_info():
    pass