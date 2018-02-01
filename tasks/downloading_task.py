# coding=utf-8

import time
import os
from flask import send_from_directory

from tasks import celery
from model.session import get_session
from model.image.image import Image
from config import config


@celery.task(name='tasks.downloading_task.download_image', ignore_result=True)
def download_image(image_id):
    pass


if __name__ == '__main__':
    print download_image(6514536764571385857)