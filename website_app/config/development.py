# coding=utf-8
import os

DEBUG = True

# 网站网址
URL = 'http://127.0.0.1:8899'

# 静态资源服务器连接地址
RESOURCE_URL = 'http://127.0.0.1:8888'

# 项目根目录
ROOT_SRC = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))

# 下载路径
DOWNLOAD_SRC = os.path.join(ROOT_SRC, 'manage_app/static/').replace('\\', '/')

# 免费下载次数限制
# 时间间隔，单位秒
FREE_DOWNLOAD_EXPIRED_TIME = 86400
# 免费下载次数
FREE_DOWNLOAD_TIMES = 1

# Cookie的name
REMEMBER_COOKIE_NAME = 'website_app_cookie'

# Cookie的domain
REMEMBER_COOKIE_DOMAIN = '127.0.0.1:8899'

# session
SESSION_COOKIE_NAME = 'website_app_session'