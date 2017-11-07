# coding=utf-8

"""
    验证用户权限
"""

from functools import wraps

from flask.ext.login import current_user


def verify_permissions(code):
    def _dec(func):
        @wraps(func)
        def dec(*args, **kwargs):
            print code
            return func(*args, **kwargs)
        return dec
    return _dec