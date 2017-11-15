# coding:utf-8

import datetime
import hashlib
import os
from PIL import Image
from manage_app.config import config
from model.session import get_session
from model.image.image import Image as Img
from model.base import IdGenerator, HashName


def save_images(image, image_type='img', auto_commit=False):
    _id = IdGenerator.gen()
    file_name = image.filename
    original_name = HashName.gen(_id, info="original")
    preview_name = HashName.gen(_id, info="preview")
    thumbnail_name = HashName.gen(_id, info="thumbnail")

    if image_type == 'img':
        upload_src = config.IMG_UPLOAD_SRC
    elif image_type == 'icon':
        upload_src = config.ICON_UPLOAD_SRC
    else:
        upload_src = config.IMG_UPLOAD_SRC
    # 图像处理
    im = Image.open(image)
    # 长宽
    width, height = im.size
    # 格式
    file_format = im.format
    # 模式
    mode = im.mode
    im.save(os.path.join(upload_src, 'original', '.'.join([original_name, file_format.lower()])).replace('\\', '/'))
    # 预览图（加水印、灰白背景）（高度固定）
    thumb_height = config.THUMBNAIL_IMG_HEIGHT
    thumb_width = int(width / (height / thumb_height))
    im.thumbnail((thumb_width, thumb_height))
    im.save(os.path.join(upload_src, 'thumbnail', '.'.join([thumbnail_name, file_format.lower()])).replace('\\', '/'))
    # 缩略图（等比例缩放）
    # 数据库存储
    with get_session() as db_session:
        img = Img()
        img.id = _id
        img.name = file_name
        img.url = original_name
        img.preview_url = preview_name
        img.thumbnail_url = thumbnail_name
        img.format = file_format
        img.width = width
        img.mode = mode
        img.height = height
        db_session.add(img)
        if auto_commit:
            db_session.commit()

if __name__ == '__main__':
    width, height = (800, 427)
    thumb_height = config.THUMBNAIL_IMG_HEIGHT
    thumb_width = int(width / (height / thumb_height))
    print float(427 / 800)