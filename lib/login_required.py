# coding=utf-8

from functools import wraps
from flask import current_app, render_template, request, redirect, url_for, jsonify
from flask.ext.login import current_user


def login_required(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        if current_user.is_authenticated():
            if current_user.is_auth:
                return func(*args, **kwargs)
            else:
                context = {
                    'source': 'auth'
                }
                result = {
                    'response': 'NeedAuth',
                    'url': url_for('index.send_auth_page', **context),
                    'info': u'未验证邮箱，请您前往个人中心验证邮箱'
                }
                return jsonify(result)
        else:
            result = {
                'response': 'NeedLogin',
                'url': url_for('index.login'),
                'info': u'未登陆，请返回登陆页面'
            }
            return jsonify(result)

    return wrapper