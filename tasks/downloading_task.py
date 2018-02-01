# coding=utf-8

import time
import os
from flask import send_from_directory

from tasks import app
from model.session import get_session
from model.image.image import Image
from config import config


@app.task(name='tasks.downloading_task.download_image', ignore_result=True)
def download_image(image):
    file_url = image.img_full_url
    file_full_path = os.path.join(config.DOWNLOAD_SRC, file_url).replace('/', '\\')
    file_name = file_full_path.split('\\')[-1]
    file_dir = '\\'.join(file_full_path.split('\\')[:-1])
    if os.path.isfile(file_full_path):
        return send_from_directory(file_dir, file_name, as_attachment=True)


if __name__ == '__main__':
    pass