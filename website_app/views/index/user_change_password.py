# encoding=utf-8

import datetime

from flask import render_template, abort, g, jsonify, request, session, redirect, url_for
from flask.ext.login import current_user, login_user, logout_user

from model.session import get_session
from model.website.customer import CustomerCollect, Customer
from model.image.image import Image

from lib.paginator import SQLAlchemyPaginator
from lib.login_required import login_required

from route import index


@index.route('/user_change_password', methods=['GET'])
@login_required
def user_change_password():
    result = {
        'response': 'ok',
        'info': u''
    }
    try:
        pass
    except Exception as e:
        print e