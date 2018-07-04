# encoding=utf-8

import datetime
import traceback
from flask import render_template, abort, g, jsonify, request, session, redirect, url_for
from flask.ext.login import current_user, login_user, logout_user

from website_app.config import config
from model.session import get_session
from model.website.customer import CustomerCollect, Customer

from lib.aes_encrypt import AESCipher
from lib.login_required import login_required

from route import index


@index.route('/user_change_password', methods=['POST'])
@login_required
def user_change_password():
    result = {
        'response': 'ok',
        'info': u'修改密码成功',
        'url': config.URL + '/logout'
    }
    old_password = request.form.get('old_password', None)
    new_password = request.form.get('new_password', None)
    try:
        if old_password and new_password:
            with get_session() as db_session:
                customer = db_session.query(Customer).filter(
                    Customer.email == current_user.email
                ).first()
                if customer:
                    if old_password == AESCipher.decrypt(customer.password):
                        customer.password = AESCipher.encrypt(new_password)
                        db_session.commit()
                        # 修改密码后重新登陆
                    else:
                        result.update({
                            'response': 'fail',
                            'info': u'用户当前密码不正确'
                        })
                else:
                    result.update({
                        'response': 'fail',
                        'info': u'未查询到当前会员'
                    })
        else:
            result.update({
                'response': "fail",
                'info': u'请补充空填的密码项'
            })
        return jsonify(result)
    except Exception as e:
        print traceback.format_exc(e)