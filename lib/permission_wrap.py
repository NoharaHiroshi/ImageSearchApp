# coding=utf-8

from functools import wraps

from flask.ext.login import current_user


def verify_permissions(code):
    def _dec(func):
        @wraps(func)
        def dec(*args, **kwargs):
            return func(*args, **kwargs)
        return dec
    return _dec