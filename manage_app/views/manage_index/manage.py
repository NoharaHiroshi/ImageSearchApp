# coding:utf-8

import traceback
import time
from flask import render_template, abort, g, redirect, url_for, request, jsonify, session
from flask.ext.login import current_user, login_user
from flask import current_app as app
from sqlalchemy import or_, func, and_

from model.session import get_session
from model.manage.user import User

from lib.aes_encrypt import AESCipher

from route import manage


@manage.route('/', methods=['GET'])
def index():
    try:
        context = {'module': 'manage'}
        # 判断是否是登陆用户
        if current_user.is_authenticated():
            return render_template('tpl/manage_page.html', **context)
        else:
            return redirect(url_for('manage.login'))
    except Exception as e:
        app.my_logger.error(traceback.format_exc(e))
        abort(400)


# 登陆相关
@manage.route('/login', methods=['GET', 'POST'])
def login():
    try:
        # 验证数据，对时间进行验证，超时时间设定为10分钟
        date = str(time.time())
        aes_date = AESCipher.encrypt(date)
        context = {
            'token': aes_date
        }

        # 持久会话
        session.permanent = True

        # 对已登录用户进行跳转
        if current_user.is_authenticated():
            return redirect(url_for('manage.index'))

        # 登陆
        if request.method == 'POST':
            result = {
                'response': 'ok',
                'info': ''
            }
            aes_date = request.form.get('token')
            account = request.form.get('account')
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

            if not account:
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
                        User.email == account,
                        User.phone == account
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

                    # 登陆成功后，跳转到后台管理界面
                    login_user(user)
                    result['url'] = url_for('manage.index')
                    return jsonify(result)
                else:
                    result.update({
                        'response': 'fail',
                        'info': u'当前用户不存在'
                    })
                    return jsonify(result)
        return render_template('tpl/login.html', **context)
    except Exception as e:
        print e
        abort(400)