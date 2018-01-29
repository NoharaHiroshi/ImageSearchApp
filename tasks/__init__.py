# coding=utf-8

import time
from celery import Celery
from tasks.config import config

# celery实例
app = Celery('tasks', backend='redis', broker='redis://127.0.0.1:6380/0')
app.conf.CELERY_RESULT_BACKEND = 'redis://127.0.0.1:6380/0'
app.conf.CELERY_IMPORTS = config.CELERY_IMPORTS
