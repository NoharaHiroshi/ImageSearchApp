# coding=utf-8

# 这一行不能删
from task.config.base import *
from redis_store.config import config as redis_config

CELERY_TIMEZONE = 'Asia/Shanghai'
BROKER_URL = 'redis://%s:%d/%d' % (redis_config.REDIS_HOST, redis_config.REDIS_PORT, redis_config.DOWNLOADING_DB)
CELERY_TASK_SERIALIZER = 'json'
CELERY_RESULT_SERIALIZER = 'json'
