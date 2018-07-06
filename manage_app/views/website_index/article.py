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

from route import website


@website.route('/article_list', methods=['GET'])
def article_list():
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