# encoding=utf-8

import traceback
import datetime
from flask import render_template, abort, g, jsonify, request, session, redirect, url_for
from flask.ext.login import current_user, login_user, logout_user

from model.session import get_session
from model.website.customer import Customer
from model.website.discount_code import DiscountCode, DisocuntCodeGenHistory
from model.website.discount import CustomerDiscount, Discount

from lib.login_required import login_required

from route import index


@index.route('/exchange_code_page', methods=['GET'])
@login_required
def exchange_code_page():
    result = {
        'response': 'ok',
        'info': u''
    }
    try:
        return jsonify(result)
    except Exception as e:
        print traceback.format_exc(e)


@index.route('/exchange_code', methods=['POST'])
@login_required
def exchange_code():
    result = {
        'response': 'ok',
        'info': u'券码兑换成功'
    }
    code = request.form.get('code', None)
    try:
        with get_session() as db_session:
            code_query = db_session.query(DiscountCode).filter(
                DiscountCode.code == code
            ).first()
            if code_query:
                # 查询兑换码状态
                if code_query.status == DiscountCode.STATUS_NEW:
                    # 券码对应的权益
                    discount = db_session.query(Discount).get(code_query.discount_id)
                    if discount:
                        # 查询当前用户是否已有优惠权益，如果有则续期
                        customer_discount = db_session.query(CustomerDiscount).filter(
                            CustomerDiscount.customer_id == current_user.id
                        ).first()
                        if customer_discount:
                            cus_discount_obj = db_session.query(Discount).get(customer_discount.discount_id)
                            if cus_discount_obj:
                                # 权益相同，时间延长
                                if cus_discount_obj.level == discount.level:
                                    customer_discount.effect_end = customer_discount.effect_end + \
                                                                   datetime.timedelta(int(discount.effect_days))
                                # 暂时处理为更新新一级权益，只升不降
                                else:
                                    # 会员当前权益等级大于兑换券权益，拒绝录入
                                    if cus_discount_obj.level > discount.level:
                                        result.update({
                                            'response': 'fail',
                                            'info': u'您当前的会员权益高于兑换券权益，无法兑换'
                                        })
                                        return jsonify(result)
                                    else:
                                        # 升级
                                        customer_discount.discount_id = discount.id
                                        customer_discount.effect_end = customer_discount.effect_end + \
                                                                       datetime.timedelta(int(discount.effect_days))
                            else:
                                result.update({
                                    'response': 'fail',
                                    'info': u'当前会员权益不存在，请联系管理员'
                                })
                                return jsonify(result)
                        else:
                            customer_discount = CustomerDiscount()
                            customer_discount.customer_id = current_user.id
                            customer_discount.discount_id = discount.id
                            customer_discount.effect_days = discount.effect_days
                            now = datetime.datetime.now()
                            customer_discount.effect_start = now
                            customer_discount.effect_end = now + datetime.timedelta(int(discount.effect_days))
                            db_session.add(customer_discount)
                        # 更新优惠券状态
                        code_query.status = DiscountCode.STATUS_USED
                        code_query.customer_id = current_user.id
                        code_query.use_datetime = datetime.datetime.now()
                        db_session.commit()
                    else:
                        result.update({
                            'response': 'fail',
                            'info': u'兑换券会员权益不存在，请联系管理员'
                        })
                else:
                    result.update({
                        'response': 'fail',
                        'info': u'当前兑换码已经被核销'
                    })
            else:
                result.update({
                    'response': 'fail',
                    'info': u'当前券码不存在'
                })
        return jsonify(result)
    except Exception as e:
        print traceback.format_exc(e)