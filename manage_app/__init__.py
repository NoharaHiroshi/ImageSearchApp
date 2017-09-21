# coding=utf-8

from flask import Flask, render_template, redirect, request, abort, url_for, jsonify
from lib.log import create_log

from views.manage_index.route import manage as manage_route

DEFAULT_APP_NAME = __name__

BLUEPRINTS = (
    (manage_route, '/manage'),
)


def configure_blueprints(app, blueprints):
    if blueprints:
        for view, url_prefix in blueprints:
            app.register_blueprint(view, url_prefix=url_prefix)


def configure_logger(app):
    app.my_logger = create_log('platform')


def create_app(config=None, blueprints=BLUEPRINTS):
    app = Flask(DEFAULT_APP_NAME)
    app.config.from_object(config)
    configure_blueprints(app, blueprints)

    return app
