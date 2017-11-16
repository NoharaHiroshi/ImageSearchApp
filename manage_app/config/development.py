# coding=utf-8
import os

DEBUG = True


# 项目根目录
ROOT_SRC = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))

# 上传路径
UPLOAD_SRC = os.path.join(ROOT_SRC, 'manage_app/static/resource').replace('\\', '/')
# 背景图片上传路径
IMG_UPLOAD_SRC = os.path.join(UPLOAD_SRC, 'img').replace('\\', '/')
# Icon上传路径
ICON_UPLOAD_SRC = os.path.join(UPLOAD_SRC, 'icon').replace('\\', '/')
# 素材上传路径
MATERIAL_SRC = os.path.join(UPLOAD_SRC, 'material').replace('\\', '/')

# 缩略图默认大小
THUMBNAIL_IMG_HEIGHT = 400
# 预览图默认大小
PREVIEW_IMG_HEIGHT = 800

if __name__ == '__main__':
    print UPLOAD_SRC
