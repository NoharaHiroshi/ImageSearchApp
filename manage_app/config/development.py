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
        u'url': u'manage'
    }, {
        u'name': u'网站管理',
        u'code': u'website',
        u'url': u'website'
    }
]

# 缩略图默认大小
THUMBNAIL_IMG_HEIGHT = 200
# 预览图默认大小
PREVIEW_IMG_HEIGHT = 800
# 水印文字/文件
WATERMARK_IMG_FONT = u'- DuiPic.com -'
# 水印文字字体路径
WATERMARK_IMG_FONT_SRC = os.path.join(ROOT_SRC, 'website_app/static/fonts').replace('\\', '/')
# 水印文字字体
WATERMARK_IMG_FONT_TYPE = os.path.join(WATERMARK_IMG_FONT_SRC, 'Microsoft-YaHei.ttf').replace('\\', '/')

# 网站前端url
WEBSITE_URL = 'http://127.0.0.1:8899'

# Cookie的name
REMEMBER_COOKIE_NAME = 'manage_app_cookie'

# Cookie的domain
REMEMBER_COOKIE_DOMAIN = '192.168.8.51:8888'

if __name__ == '__main__':
    print WATERMARK_IMG_FONT_TYPE
