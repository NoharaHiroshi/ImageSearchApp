# coding:utf-8

import traceback
import ujson
from flask import render_template, abort, g, jsonify, request
from flask.ext.login import current_user
from flask import current_app as app

from model.session import get_session

from route import index


@index.route('/', methods=['GET'])
def index_page():
    try:
        return render_template('tpl/index/index.html')
    except Exception as e:
        app.my_logger.error(traceback.format_exc(e))
        abort(400)