# coding=utf-8

import time
from celery import Celery
from task.config import config

# celery实例
app = Celery()
# 装载配置
app.config_from_object(config)


@app.task
def add(x, y):
    return x + y

if __name__ == '__main__':
    result = add.delay(1, 1)
    print result.ready()
