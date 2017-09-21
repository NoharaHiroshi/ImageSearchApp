# coding=utf-8

from flask import Flask, render_template, redirect, request, abort, url_for, jsonify

DEFAULT_APP_NAME = __name__


def create_app(config=None, blueprints=None):
    app = Flask(DEFAULT_APP_NAME)
    app.config.from_object(config)

    return app
