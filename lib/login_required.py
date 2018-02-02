# coding=utf-8

from functools import wraps
from flask import current_app, render_template, request, redirect, url_for
from flask.ext.login import current_user


def login_required(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        if current_user.is_authenticated():
            return func(*args, **kwargs)
        else:
            context = {}
            return render_template('tpl/login.html', **context)
    return wrapper