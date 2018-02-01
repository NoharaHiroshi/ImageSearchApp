# coding=utf-8

# 这一行不能删
import os
from base import *
from redis_store.config import config as redis_config

# 项目根目录
ROOT_SRC = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))

# 下载路径
DOWNLOAD_SRC = os.path.join(ROOT_SRC, 'manage_app/static/').replace('\\', '/')

