# coding=utf-8

import os

ENV = os.environ.get('ENV', 'development')

print 'REDIS: 已加载（%s）' % ENV

if ENV == 'development':
    import development as config
