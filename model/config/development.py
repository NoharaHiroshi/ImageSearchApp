# coding=utf-8

"""开发环境使用的配置
"""

DB = 'image_search_dev'
HOST = '127.0.0.1'
USER = 'root'
PASSWORD = '123456'
# 默认使用mysql-python包
CONNECT_STRING = 'mysql://%s:%s@%s/%s?charset=utf8' % (USER, PASSWORD, HOST, DB)