# coding:utf-8

from flask import Blueprint

manage = Blueprint('manage', __name__, static_folder='templates')
index = Blueprint('index', __name__, static_folder='templates')
