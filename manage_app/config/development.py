# coding=utf-8
import os

DEBUG = True


# 项目根目录
ROOT_SRC = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))

# 上传路径
UPLOAD_SRC = os.path.join(ROOT_SRC, 'resource').replace('\\', '/')
IMG_UPLOAD_SRC = os.path.join(UPLOAD_SRC, 'img').replace('\\', '/')
ICON_UPLOAD_SRC = os.path.join(UPLOAD_SRC, 'icon').replace('\\', '/')

# 缩略图默认大小
THUMBNAIL_IMG_HEIGHT = 700

if __name__ == '__main__':
    print ICON_UPLOAD_SRC
