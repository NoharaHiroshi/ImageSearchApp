# coding=utf-8

from flask import Flask, render_template, redirect, request, abort, url_for, jsonify
from lib.log import create_log
from flask.ext.login import LoginManager, login_url
from views.manage_index.route import manage as manage_route
from redis_store import common_redis

from model.config import config as model_config
from model.session import get_session
from model.manage.user import User

DEFAULT_APP_NAME = __name__

BLUEPRINTS = (
    (manage_route, '/manage'),
)


def configure_blueprints(app, blueprints):
    if blueprints:
        for view, url_prefix in blueprints:
            app.register_blueprint(view, url_prefix=url_prefix)


def configure_login_manager(app):
    login_manager = LoginManager()
    # 指定登陆页面的视图
    login_manager.login_view = 'manage.login'
    login_manager.session_protection = "strong"
    login_manager.login_message = u'请登录系统之后进行操作'
    login_manager.login_message_category = "info"

    def init_app(_app):
        login_manager.init_app(_app)

    @login_manager.user_loader
    def load_user(user_id):

        with get_session() as db_session:
            user = db_session.query(User).get(user_id)
            if user:
                return user
            else:
                return None

    init_app(app)


def configure_logger(app):
    app.my_logger = create_log('platform')


def configure_redis(app):
    app.session_redis = common_redis


def setup_secret_key(app):
    app.config.update(SECRET_KEY=model_config.SECRET_KEY)


def create_app(config=None, blueprints=BLUEPRINTS):
    app = Flask(DEFAULT_APP_NAME)
    app.config.from_object(config)
    setup_secret_key(app)
    configure_blueprints(app, blueprints)
    configure_redis(app)
    configure_login_manager(app)

    return app
