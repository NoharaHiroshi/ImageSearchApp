# coding:utf-8

import traceback
import time
from flask import render_template, abort, g, redirect, url_for, request, jsonify, session
from flask.ext.login import current_user, login_user, logout_user, login_required
from flask import current_app as app

from route import website


@website.route('/', methods=['GET'])
@login_required
def website_manage_index():
    try:
        return render_template('tpl/website_page.html')
    except Exception as e:
        app.my_logger.error(traceback.format_exc(e))
        abort(400)
