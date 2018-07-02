# coding=utf-8

from functools import wraps
from flask import current_app, render_template, request, redirect, url_for, jsonify
from flask.ext.login import current_user


def login_required(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        print '会员登录情况：%s' % current_user.is_authenticated()
        if current_user.is_authenticated():
            return func(*args, **kwargs)
        else:
            result = {
                'response': 'NeedLogin',
                'url': url_for('index.login'),
                'info': u'未登陆，请返回登陆页面'
            }
            return jsonify(result)

    return wrapper