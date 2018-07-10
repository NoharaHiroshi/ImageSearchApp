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
from lib.paginator import SQLAlchemyPaginator

from model.session import get_session
from model.website.customer import Customer
from model.website.article import Article
from model.manage.user import User

from route import index
from website_app.config import config


@index.route('/article_list', methods=['GET'])
def get_article_list():
    result = {
        'response': 'ok',
        'meta': {},
        'article_list': []
    }
    try:
        page = request.args.get('page', 1)
        limit = 10
        with get_session() as db_session:
            query = db_session.query(Article)
            paginator = SQLAlchemyPaginator(query, limit)
            page = paginator.get_validate_page(page)
            for article in paginator.page(page):
                article_dict = article.to_dict()
                result['article_list'].append(article_dict)
            result.update({
                'meta': {
                    'cur_page': page,
                    'all_page': paginator.max_page,
                    'count': paginator.count
                }
            })
            return jsonify(result)
    except Exception as e:
        print traceback.format_exc(e)


@index.route('/article_detail', methods=['GET'])
def get_article_detail():
    result = {
        'response': 'ok',
        'article': '',
        'info': ''
    }
    _id = request.args.get('id', None)
    try:
        with get_session() as db_session:
            article = db_session.query(Article).get(_id)
            if article:
                author_id = article.author
                author = db_session.query(User).get(author_id)
                author_name = author.name if author else u'影子管理员'
                article_dict = article.to_dict()
                article_dict['author_name'] = author_name
                result.update({
                    'article': article_dict,
                })
            else:
                result.update({
                    'response': 'fail',
                    'info': u'当前文章不存在'
                })
        return jsonify(result)
    except Exception as e:
        print e