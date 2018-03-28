# coding:utf-8

import traceback
import time
from flask import render_template, abort, g, redirect, url_for, request, jsonify, session
from flask.ext.login import current_user, login_user, logout_user, login_required
from flask import current_app as app
from sqlalchemy import or_, func, and_

from manage_app.config import config
from lib.aes_encrypt import AESCipher
from model.session import get_session
from model.manage.menu import Menu
from model.manage.user import User

from route import index


@index.route('/', methods=['GET'])
def main_index():
    try:
        return render_template('tpl/index.html')
    except Exception as e:
        print e


# 登陆相关
@index.route('/get_login_page', methods=['GET'])
def get_login_page():
    result = {
        'response': 'ok',
        'info': '',
        'token': ''
    }
    try:
        # 验证数据，对时间进行验证，超时时间设定为10分钟
        date = str(time.time())
        aes_date = AESCipher.encrypt(date)
        result.update({
            'token': aes_date
        })
        return jsonify(result)
    except Exception as e:
        print e
        abort(400)


@index.route('/login', methods=['POST'])
def login():
    result = {
        'response': 'ok',
        'info': ''
    }
    aes_date = request.form.get('token')
    username = request.form.get('username')
    password = request.form.get('password')

    if not aes_date:
        result.update({
            'response': 'fail',
            'info': u'请求错误'
        })
        return jsonify(result)
    else:
        des_date = int(float(AESCipher.decrypt(aes_date)))
        now = int(time.time())
        if now - des_date >= 6000:
            result.update({
                'response': 'fail',
                'info': u'当前页面已过期，请刷新后重新登陆'
            })
            return jsonify(result)

    if not username:
        result.update({
            'response': 'fail',
            'info': u'请输入邮箱/手机号'
        })
        return jsonify(result)
    if not password:
        result.update({
            'response': 'fail',
            'info': u'请输入密码'
        })
        return jsonify(result)

    with get_session() as db_session:
        user = db_session.query(User).filter(
            or_(
                User.email == username,
                User.phone == username
            )
        ).first()
        if user:
            if not user.check_password(password):
                result.update({
                    'response': 'fail',
                    'info': u'用户信息或密码填写错误'
                })
                return jsonify(result)

            if not user.is_status_active():
                result.update({
                    'response': 'fail',
                    'info': u'当前用户已被锁定，请联络管理员'
                })
                return jsonify(result)

            # 验证身份后，调用Flask-Login中的login_user(),将user实例标记为已登录
            login_user(user)
            return jsonify(result)
        else:
            result.update({
                'response': 'fail',
                'info': u'当前用户不存在'
            })
            return jsonify(result)


@index.route('/logout', methods=['GET'])
@login_required
def logout():
    try:
        logout_user()
        return redirect(url_for('manage.login'))
    except Exception as e:
        print e
        abort(400)