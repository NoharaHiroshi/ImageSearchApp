# coding:utf-8

import traceback
from flask import render_template, abort, g, redirect, url_for, request, jsonify, session
from flask.ext.login import current_user, login_user
from flask import current_app as app
from sqlalchemy import or_, func, and_

from model.session import get_session
from model.manage.user import User

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
        context = {
            'token': '123456'
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
            account = request.form.get('account')
            password = request.form.get('password')
            
            if not account:
                result.update({
                    'response': 'fail',
                    'info': u'请输入邮箱/手机号'
                })
            if not password:
                result.update({
                    'response': 'fail',
                    'info': u'请输入密码'
                })

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

                    if not user.is_status_active():
                        result.update({
                            'response': 'fail',
                            'info': u'当前用户已被锁定，请联络管理员'
                        })

                    # 登陆成功后，跳转到后台管理界面
                    login_user(user)
                    result['url'] = url_for('manage.index')

                else:
                    result.update({
                        'response': 'fail',
                        'info': u'无当前用户'
                    })
            return jsonify(result)
        return render_template('tpl/login.html', **context)
    except Exception as e:
        app.my_logger.error(traceback.format_exc(e))
        abort(400)