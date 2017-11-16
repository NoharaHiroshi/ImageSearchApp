# coding:utf-8

import os
from PIL import Image
from manage_app.config import config
from model.session import get_session
from model.image.image import Image as Img
from model.base import IdGenerator, HashName


def save_images(images, image_type='img'):
    with get_session() as db_session:
        for image in images:
            _id = IdGenerator.gen()
            file_name = image.filename
            original_name = HashName.gen(_id, info="original")
            preview_name = HashName.gen(_id, info="preview")
            thumbnail_name = HashName.gen(_id, info="thumbnail")

            # 背景图片处理方式
            if image_type == 'img':
                upload_src = config.IMG_UPLOAD_SRC
            elif image_type == 'icon':
                upload_src = config.ICON_UPLOAD_SRC
            else:
                upload_src = config.IMG_UPLOAD_SRC
            # 图像处理
            im = Image.open(image)
            preview_im = im.copy()
            thumb_im = im.copy()
            # 长宽
            width, height = im.size
            # 格式
            file_format = im.format
            # 模式
            mode = im.mode
            im.save(os.path.join(upload_src, 'original', '.'.join([original_name, file_format.lower()])).replace('\\', '/'))
            # 预览图（高度固定）
            preview_height = int(config.THUMBNAIL_IMG_HEIGHT)
            preview_width = int(width / (float(height) / preview_height))
            preview_im.thumbnail((preview_width, preview_height))
            preview_im.save(os.path.join(upload_src, 'preview', '.'.join([preview_name, file_format.lower()])).replace('\\', '/'))
            # 缩略图（等比例缩放）
            thumb_height = int(config.PREVIEW_IMG_HEIGHT)
            thumb_width = int(width / (float(height) / thumb_height))
            thumb_im.thumbnail((thumb_width, thumb_height))
            thumb_im.save(os.path.join(upload_src, 'thumbnail', '.'.join([thumbnail_name, file_format.lower()])).replace('\\', '/'))
            # 数据库存储
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
        db_session.commit()

if __name__ == '__main__':
    pass
