# coding=utf-8

import sys
import os
import time
from celery import Celery
from tasks.config import config

# 修改python_path查询顺序，防止其他项目干扰
project_path = os.path.abspath(os.path.dirname(os.path.dirname(__file__)))
sys.path.insert(0, project_path)

# celery实例
app = Celery('tasks', backend='redis', broker='redis://127.0.0.1:6380/0')
app.conf.CELERY_RESULT_BACKEND = 'redis://127.0.0.1:6380/0'
app.conf.CELERY_IMPORTS = config.CELERY_IMPORTS
