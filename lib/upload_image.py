# coding:utf-8

import os
from PIL import Image as Img
from manage_app.config import config
from model.session import get_session
from model.image.image import Image
from model.base import IdGenerator, HashName
from model.image.image_tags import ImageTags, ImageTagsRel
from model.image.image_series import ImageSeries, ImageSeriesRel


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
            im = Img.open(image)
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
            preview_height = int(config.PREVIEW_IMG_HEIGHT)
            preview_width = int(width / (float(height) / preview_height))
            preview_im.thumbnail((preview_width, preview_height))
            preview_im.save(os.path.join(upload_src, 'preview', '.'.join([preview_name, file_format.lower()])).replace('\\', '/'))
            # 缩略图（等比例缩放）
            thumb_height = int(config.THUMBNAIL_IMG_HEIGHT)
            thumb_width = int(width / (float(height) / thumb_height))
            thumb_im.thumbnail((thumb_width, thumb_height))
            thumb_im.save(os.path.join(upload_src, 'thumbnail', '.'.join([thumbnail_name, file_format.lower()])).replace('\\', '/'))
            # 数据库存储
            img = Image()
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


# 删除图片时，需要解绑专题和标签的联系
def delete_images(ids, image_type='img'):
    # 选择图片存储位置
    if image_type == 'img':
        upload_src = config.IMG_UPLOAD_SRC
    elif image_type == 'icon':
        upload_src = config.ICON_UPLOAD_SRC
    else:
        upload_src = config.IMG_UPLOAD_SRC
    with get_session() as db_session:
        query = db_session.query(Image).filter(
            Image.id.in_(ids)
        ).all()
        db_session.query(ImageSeriesRel).filter(
            ImageSeriesRel.image_id.in_(ids)
        ).delete(synchronize_session=False)
        db_session.query(ImageTagsRel).filter(
            ImageTagsRel.image_id.in_(ids)
        ).delete(synchronize_session=False)
        for img in query:
            full_src = os.path.join(upload_src, 'original', '.'.join([img.url, img.format.lower()])).replace('\\', '/')
            preview_src = os.path.join(upload_src, 'preview', '.'.join([img.preview_url, img.format.lower()])).replace('\\', '/')
            thumb_src = os.path.join(upload_src, 'thumbnail', '.'.join([img.thumbnail_url, img.format.lower()])).replace('\\', '/')
            for src in [full_src, preview_src, thumb_src]:
                if os.path.isfile(src):
                    os.remove(src)
            db_session.delete(img)
        db_session.commit()


def image_series_color(index):
    index = int(index)
    color_list = [
        '#4b91cf', '#6a77d7', '#8c6bd4', '#b86acf', '#6adadb', '#6cdcaa',
        '#6ce07d', '#89e26c', '#bde56b', '#e7d46b', '#e69f6b', '#ed6b6b',
        '#e74b4c', '#6aa6d8', '#8f97e0', '#a58cdd', '#c78cdc', '#8ee4e5',
        '#8ce79a', '#8ce79a', '#a3e88d', '#ceeb8e', '#ebe08e', '#edb68d',
        '#f18d8d', '#ed6b6b'
    ]
    color_list_len = len(color_list)
    _index = index % color_list_len
    return color_list[_index]

if __name__ == '__main__':
    print image_series_color(33)
