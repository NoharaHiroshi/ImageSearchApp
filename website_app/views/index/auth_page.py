# coding:utf-8

import traceback
import re
import time
import ujson
import os
from sqlalchemy import or_
from flask import render_template, abort, g, jsonify, request, session, redirect, url_for
from flask.ext.login import current_user, login_user, logout_user
from lib.login_required import login_required
from lib.aes_encrypt import AESCipher
from lib.send_email import send_email

from model.session import get_session
from model.website.customer import Customer

from route import index
from website_app.config import config


# 获取用户邮箱后缀，根据后缀获取登陆邮箱的页面
def get_customer_email_url(email):
    email_type = re.findall('@.+\.', email)[0][1:-1]
    if email_type == 'qq':
        email_login_url = 'https://mail.qq.com/'
    elif email_type == '163':
        email_login_url = 'https://mail.163.com/'
    elif email_type == 'sina':
        email_login_url = 'http://mail.sina.com.cn/'
    elif email_type == 'sohu':
        email_login_url = 'https://mail.sohu.com/'
    elif email_type == 'yahoo':
        email_login_url = 'https://cn.overview.mail.yahoo.com/'
    else:
        email_login_url = '#'
    return email_login_url


@index.route('/send_auth_email', methods=['GET'])
@login_required
def send_auth_email():
    result = {
        'response': 'ok',
        'info': ''
    }
    try:
        if current_user.is_authenticated():
            if not current_user.is_auth:
                now = str(int(time.time()))
                email = current_user.email
                en_str = '_'.join([email, now])
                en_info = AESCipher.encrypt(en_str)
                full_url = config.URL + '/verify_email_effect?en_str=' + en_info
                r = send_email(
                    u'恭喜您注册成功',
                    u'恭喜您注册成功, 请您点击以下链接 %s 完成验证，该邮件24小时内有效' % full_url,
                    email
                )
                if r.get('response') != 'ok':
                    result.update({
                        'response': 'fail',
                        'info': u'邮件发送失败'
                    })
            else:
                result.update({
                    'response': 'fail',
                    'info': u'您已经验证过邮箱了'
                })
        else:
            result.update({
                'response': 'fail',
                'info': u'当前用户未登录，请返回登陆'
            })
        return jsonify(result)
    except Exception as e:
        print traceback.format_exc(e)


@index.route('/auth_customer_page', methods=['GET'])
@login_required
def auth_customer_page():
    result = {
        'response': 'ok',
        'user': '',
        'info': '',
        'email_login_url': ''
    }
    try:
        if current_user.is_authenticated():
            email_login_url = get_customer_email_url(current_user.email)
            user_dict = current_user.to_dict()
            result.update({
                'user': user_dict,
                'email_login_url': email_login_url
            })
        else:
            result.update({
                'response': 'fail',
                'info': u'当前用户未登录，请返回登陆'
            })
        return jsonify(result)
    except Exception as e:
        print traceback.format_exc(e)


@index.route('/verify_email_effect', methods=['GET'])
@login_required
def verify_email_effect():
    result = {
        'response': 'ok',
        'info': ''
    }
    try:
        en_str = request.args.get('en_str')
        if en_str:
            de_str = AESCipher.decrypt(en_str)
            info_list = de_str.split('_')
            email = info_list[0]
            date = int(info_list[1])
            now = int(time.time())
            if now - date >= 60 * 60 * 24:
                result.update({
                    'response': 'fail',
                    'info': u'验证邮件已过期'
                })
            else:
                with get_session() as db_session:
                    customer = db_session.query(Customer).filter(
                        Customer.email == email
                    ).first()
                    if customer:
                        customer.is_auth = Customer.AUTH_YES
                        db_session.commit()
                    else:
                        result.update({
                            'response': 'fail',
                            'info': u'当前用户不存在'
                        })
        else:
            result.update({
                'response': 'fail',
                'info': u'无法读取验证邮件信息'
            })
        return jsonify(result)
    except Exception as e:
        print traceback.format_exc(e)

if __name__ == '__main__':
    pass