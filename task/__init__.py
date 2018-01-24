# coding=utf-8

from celery import Celery
from task.config import config

# celery实例
app = Celery()
# 装载配置
app.config_from_object()