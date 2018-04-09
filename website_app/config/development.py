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
FREE_DOWNLOAD_EXPIRED_TIME = 100
# 免费下载次数
FREE_DOWNLOAD_TIMES = 2

