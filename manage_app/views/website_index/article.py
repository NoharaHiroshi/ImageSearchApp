# coding:utf-8

import traceback
from flask import render_template, abort, g, jsonify, request
from flask import current_app as app

from model.session import get_session
from model.website.banner import Banner
from model.image.image import Image
from model.image.image_series import ImageSeries
from model.website.article import Article

from lib.upload_image import save_images
from lib.login_required import auth_required

from route import website


@website.route('/article_list', methods=['GET'])
@auth_required
def get_article_list():
    result = {
        'response': 'ok',
        'article_list': []
    }
    try:
        with get_session() as db_session:
            query = db_session.query(Article).all()
            for article in query:
                article_dict = article.to_dict()
                result['article_list'].append(article_dict)
            return jsonify(result)
    except Exception as e:
        print traceback.format_exc(e)


@website.route('/article_list/detail', methods=['GET'])
@auth_required
def get_article_detail():
    result = {
        'response': 'ok',
        'article': '',
        'info': ''
    }
    article_id = request.args.get('id', None)
    try:
        with get_session() as db_session:
            article = db_session.query(Article).get(article_id)
            if article:
                article_dict = article.to_dict()
                result['article'] = article_dict
            else:
                result.update({
                    'response': 'fail',
                    'info': u'当前文章不存在'
                })
        return jsonify(result)
    except Exception as e:
        print traceback.format_exc(e)


@website.route('/article_list/delete', methods=['POST'])
@auth_required
def delete_article_list():
    result = {
        'response': 'ok',
        'info': ''
    }
    ids = request.form.get('ids').split(',')
    try:
        with get_session() as db_session:
            if ids[0]:
                db_session.query(Article).filter(
                    Article.id.in_(ids)
                ).delete(synchronize_session=False)
                db_session.commit()
            else:
                result.update({
                    'response': 'fail',
                    'info': u'当前未选择任何文章'
                })
        return jsonify(result)
    except Exception as e:
        app.my_logger.error(traceback.format_exc(e))
        abort(400)


@website.route('/article_list/publish', methods=['POST'])
@auth_required
def publish_article_list():
    result = {
        'response': 'ok',
        'info': ''
    }
    ids = request.form.get('ids').split(',')
    status = request.form.get('status', Article.STATUS_DRAFT)
    try:
        with get_session() as db_session:
            if ids[0]:
                article_list = db_session.query(Article).filter(
                    Article.id.in_(ids)
                ).all()
                for article in article_list:
                    article.status = status
                db_session.commit()
            else:
                result.update({
                    'response': 'fail',
                    'info': u'当前未选择任何文章'
                })
        return jsonify(result)
    except Exception as e:
        app.my_logger.error(traceback.format_exc(e))
        abort(400)


def update_article_from_params(obj, title, status, view_count, agree_count, disagree_count, desc, content):
    obj.title = title
    obj.status = status
    obj.view_count = view_count
    obj.agree_count = agree_count
    obj.disagree_count = disagree_count
    obj.desc = desc
    obj.content = content


@website.route('/article_list/update', methods=['POS'])
@auth_required
def update_article():
    result = {
        'response': 'ok',
        'info': ''
    }
    article_id = request.form.get('id', None)
    title = request.form.get('title', None)
    status = request.form.get('status', 0)
    view_count = request.form.get('view_count', 0)
    agree_count = request.form.get('agree_count', 0)
    disagree_count = request.form.get('disagree_cont', 0)
    desc = request.form.get('desc', '')
    content = request.form.get('content', '')
    try:
        with get_session() as db_session:
            if article_id:
                article = db_session.query(Article).get(article_id)
                if article:
                    update_article_from_params(obj=article, title=title, status=status, view_count=view_count,
                                               agree_count=agree_count, disagree_count=disagree_count,
                                               desc=desc, content=content)
                else:
                    result.update({
                        'response': 'fail',
                        'info': u'未查询到当前文章'
                    })
            else:
                article = Article()
                update_article_from_params(obj=article, title=title, status=status, view_count=view_count,
                                           agree_count=agree_count, disagree_count=disagree_count,
                                           desc=desc, content=content)
                db_session.add(article)
            db_session.commit()
        return jsonify(result)
    except Exception as e:
        print traceback.format_exc(e)