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

# 模块配置
MODULES = [
    {
        u'name': u'系统管理',
        u'code': u'manage',
        u'url': u'http://127.0.0.1:8888/manage'
    }, {
        u'name': u'网站管理',
        u'code': u'website',
        u'url': u'http://127.0.0.1:8888/website'
    }
]

# 缩略图默认大小
THUMBNAIL_IMG_HEIGHT = 200
# 预览图默认大小
PREVIEW_IMG_HEIGHT = 400

if __name__ == '__main__':
    print UPLOAD_SRC
