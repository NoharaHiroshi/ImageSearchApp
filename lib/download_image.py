# coding:utf-8

from flask import request, jsonify, send_from_directory, abort
from model.session import get_session
from model.image.image import Image
from manage_app.config import config
import os


def download(image):
    file_url = image.img_full_url
    file_full_path = os.path.join(config.DOWNLOAD_SRC, file_url).replace('/', '\\')
    file_name = file_full_path.split('\\')[-1]
    file_dir = '\\'.join(file_full_path.split('\\')[:-1])
    if os.path.isfile(file_full_path):
        return send_from_directory(file_dir, file_name, as_attachment=True)

if __name__ == '__main__':
    with get_session() as db_session:
        image = db_session.query(Image).get(6514536773161320451)
        obj = download(image)
        print obj