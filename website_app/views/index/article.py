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
from model.website.article import Article, ArticleComment
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
        'comment_list': [],
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
                # 获取文章所有一级评论
                all_comment = db_session.query(ArticleComment).filter(
                    ArticleComment.comment_id == article.id,
                    ArticleComment.type == ArticleComment.TYPE_ARTICLE
                ).all()
                for comment in all_comment:
                    all_reply = db_session.query(ArticleComment).filter(
                        ArticleComment.comment_id == comment.id,
                        ArticleComment.type == ArticleComment.TYPE_COMMENT
                    ).all()
                    comment_dict = comment.to_dict()
                    comment_dict['reply_list'] = list()
                    # 获取二级评论
                    for reply in all_reply:
                        reply_dict = reply.to_dict()
                        frl = list()
                        # 获取三级评论, 三级评论是首尾相连
                        floor_reply_list = reply.floor_reply_list(frl)
                        reply_dict['reply_reply_list'] = floor_reply_list

                        comment_dict['reply_list'].append(reply_dict)

                    result['comment_list'].append(comment_dict)
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
        print traceback.format_exc(e)


@index.route('/article_comment', methods=['POST'])
@login_required
def comment_article():
    result = {
        'response': 'ok',
        'info': u'评论成功',
        'comment_list': [],
    }
    article_id = request.form.get('article_id')
    content = request.form.get('content', '')
    t = request.form.get('type', 0)
    comment_id = request.form.get('comment_id', None)
    try:
        customer_id = current_user.id
        customer_name = current_user.name
        with get_session() as db_session:
            article = db_session.query(Article).get(article_id)
            if article:
                customer_comment = ArticleComment()
                customer_comment.comment_id = comment_id
                customer_comment.customer_id = customer_id
                customer_comment.customer_name = customer_name
                customer_comment.type = t
                customer_comment.content = content
                db_session.add(customer_comment)
                db_session.commit()
                # 获取文章所有一级评论
                all_comment = db_session.query(ArticleComment).filter(
                    ArticleComment.comment_id == article.id,
                    ArticleComment.type == ArticleComment.TYPE_ARTICLE
                ).all()
                for comment in all_comment:
                    all_reply = db_session.query(ArticleComment).filter(
                        ArticleComment.comment_id == comment.id,
                        ArticleComment.type == ArticleComment.TYPE_COMMENT
                    ).all()
                    comment_dict = comment.to_dict()
                    comment_dict['reply_list'] = list()
                    # 获取二级评论
                    for reply in all_reply:
                        reply_dict = reply.to_dict()
                        frl = list()
                        # 获取三级评论, 三级评论是首尾相连
                        floor_reply_list = reply.floor_reply_list(frl)
                        reply_dict['reply_reply_list'] = floor_reply_list

                        comment_dict['reply_list'].append(reply_dict)

                    result['comment_list'].append(comment_dict)
            else:
                result.update({
                    'response': 'fail',
                    'info': u'当前文章不存在'
                })
        return jsonify(result)
    except Exception as e:
        print traceback.format_exc(e)


@index.route('/article_comment/delete', methods=['POST'])
@login_required
def delete_comment_article():
    result = {
        'response': 'ok',
        'info': u'删除评论成功',
        'comment_list': [],
    }
    comment_id = request.form.get('comment_id', None)
    article_id = request.form.get('article_id')
    try:
        customer_id = current_user.id
        with get_session() as db_session:
            article = db_session.query(Article).get(article_id)
            if article:
                comment = db_session.query(ArticleComment).filter(
                    ArticleComment.id == comment_id
                )
                if comment.first():
                    comment = comment.filter(
                        ArticleComment.customer_id == customer_id
                    )
                    if comment.first():
                        comment.delete(synchronize_session=False)
                        db_session.commit()
                        all_comment = db_session.query(ArticleComment).filter(
                            ArticleComment.comment_id == article.id,
                            ArticleComment.type == ArticleComment.TYPE_ARTICLE
                        ).all()
                        for comment in all_comment:
                            all_reply = db_session.query(ArticleComment).filter(
                                ArticleComment.comment_id == comment.id,
                                ArticleComment.type == ArticleComment.TYPE_COMMENT
                            ).all()
                            comment_dict = comment.to_dict()
                            comment_dict['reply_list'] = list()
                            # 获取二级评论
                            for reply in all_reply:
                                reply_dict = reply.to_dict()
                                frl = list()
                                # 获取三级评论, 三级评论是首尾相连
                                floor_reply_list = reply.floor_reply_list(frl)
                                reply_dict['reply_reply_list'] = floor_reply_list

                                comment_dict['reply_list'].append(reply_dict)

                            result['comment_list'].append(comment_dict)
                    else:
                        result.update({
                            'response': 'fail',
                            'info': u'您无法删除当前评论'
                        })
                else:
                    result.update({
                        'response': 'fail',
                        'info': u'当前评论不存在'
                    })
            else:
                result.update({
                    'response': 'fail',
                    'info': u'当前文章不存在'
                })
        return jsonify(result)
    except Exception as e:
        print traceback.format_exc(e)