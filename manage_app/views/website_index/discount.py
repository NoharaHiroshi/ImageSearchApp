# encoding=utf-8

import traceback
from flask import render_template, abort, g, redirect, url_for, request, jsonify, session
from sqlalchemy import or_, func, and_

from model.website.customer import Customer
from model.website.discount import Discount, CustomerDiscount
from model.image.image import Image
from model.session import get_session
from manage_app.views.website_index.route import website

from lib.upload_image import save_images


@website.route('/discount_list', methods=['GET'])
def get_discount_list():
    result = {
        'response': 'ok',
        'discount_list': []
    }
    try:
        discount_list = list()
        with get_session() as db_session:
            all_discount = db_session.query(Discount).order_by(-Discount.created_date).all()
            for discount in all_discount:
                discount_dict = discount.to_dict()
                discount_list.append(discount_dict)
            result.update({
                'discount_list': discount_list
            })
        return jsonify(result)
    except Exception as e:
        print traceback.format_exc(e)


@website.route('/discount_list/detail', methods=['GET'])
def get_discount():
    result = {
        'response': 'ok',
        'discount': '',
        'info': ''
    }
    try:
        _id = request.args.get('id')
        with get_session() as db_session:
            discount = db_session.query(Discount).get(_id)
            if discount:
                discount_dict = discount.to_dict()
                result.update({
                    'discount': discount_dict
                })
            else:
                result.update({
                    'response': 'fail',
                    'info': '当前权益不存在'
                })
        return jsonify(result)
    except Exception as e:
        print traceback.format_exc(e)


@website.route('/discount/upload', methods=['POST'])
def discount_upload():
    result = {
        'response': 'ok',
        'info': '',
        'img_id_list': []
    }
    file_objects = request.files.getlist('uploadedfile')
    try:
        if None in [file_objects]:
            result.update({
                'response': 'fail',
                'info': u'请上传图片'
            })
        else:
            # 存储banner图片
            img_id_list = save_images(file_objects, t=Image.TYPE_DISCOUNT)
            result['img_id_list'] = img_id_list
    except:
        result.update({
            'response': 'fail',
            'info': u'图片上传失败'
        })
    return jsonify(result)


@website.route('/discount_list/update', methods=['POST'])
def discount_update():
    result = {
        'response': 'ok',
        'info': ''
    }
    _id = request.form.get('id')
    name = request.form.get('name')
    status = request.form.get('status')
    times = request.form.get('times')
    price = request.form.get('price')
    effect_days = request.form.get('effect_days')
    image_id = request.form.get('img_id')
    level = request.form.get('level')
    description = request.form.get('description')
    try:
        with get_session() as db_session:
            if not _id:
                discount = Discount()
                discount.name = name
                discount.status = status
                discount.times = times
                discount.price = price
                discount.effect_days = effect_days
                discount.image_id = image_id
                discount.description = description
                discount.level = level
                db_session.add(discount)
            else:
                discount = db_session.query(Discount).get(_id)
                if discount:
                    discount.name = name
                    discount.status = status
                    discount.times = times
                    discount.price = price
                    discount.effect_days = effect_days
                    discount.image_id = image_id
                    discount.description = description
                    discount.level = level
                else:
                    result.update({
                        'response': 'fail',
                        'info': u'当前对象不存在'
                    })
            db_session.commit()
        return jsonify(result)
    except Exception as e:
        print traceback.format_exc(e)


@website.route('/discount_list/delete', methods=['POST'])
def delete_discount():
    result = {
        'response': 'ok',
        'info': ''
    }
    ids = request.form.get('ids').split(',')
    try:
        if ids[0]:
            with get_session() as db_session:
                for _id in ids:
                    customer_discount = db_session.query(
                        CustomerDiscount.discount_id == _id
                    ).all()
                    if customer_discount:
                        result.update({
                            'response': 'fail',
                            'info': u'当前权益仍关联用户，请解绑后再次操作'
                        })
                        return jsonify(result)
                    else:
                        discount = db_session.query(Discount).get(_id)
                        if discount:
                            db_session.delete(discount)
                        db_session.commit()
        else:
            result.update({
                'response': 'fail',
                'info': u'当前未选择任何权益'
            })
        return jsonify(result)
    except Exception as e:
        print traceback.format_exc(e)
