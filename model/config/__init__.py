# coding=utf-8

import os

ENV = os.environ.get('ENV', 'development')

print 'MODEL: %s' % ENV

if ENV == 'development':
    import development as config
