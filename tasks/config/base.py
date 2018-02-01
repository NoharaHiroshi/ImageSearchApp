# coding=utf-8

from kombu import Queue

CELERY_QUEUES = (
    Queue('downloading', routing_key='downloading'),
)

CELERY_ROUTES = {
    'tasks.downloading_task.download_image': {
        'queue': 'downloading',
        'routing_key': 'downloading',
    }
}

# 导入模块
CELERY_IMPORTS = (
    'tasks.downloading_task'
)
