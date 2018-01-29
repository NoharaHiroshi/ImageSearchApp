# coding=utf-8

from kombu import Queue

CELERY_QUEUES = (
    Queue('test', routing_key='add'),
)

CELERY_ROUTES = {
    'tasks.test.add': {
        'queue': 'test',
        'routing_key': 'add',
    }
}

# 导入队列
CELERY_IMPORTS = (
    'tasks.test'
)
