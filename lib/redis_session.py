# coding=utf-8
u"""
session相关功能

"""

import cPickle
from uuid import uuid4


class RedisSession:
    u"""
    通过redis实现统一存储、获得、删除session,从而保持应用服务器无状态，更好的实现负载均衡
    """
    def __init__(self, redis, sid=None, key_prefix='session'):
        self.redis = redis
        self.sid = sid if sid else self.gen_sid()
        self.key_prefix = key_prefix
        self.expire = 3600 * 24

    def open_session(self):
        data = self.redis.get(self.prefixed(self.sid))
        sdata = cPickle.loads(data) if data else data
        return sdata

    def save_session(self, data):
        self.redis.setex(
            self.prefixed(self.sid),
            self.expire,
            cPickle.dumps(data),
        )

    def delete_session(self):
        self.redis.delete(self.prefixed(self.sid))

    def prefixed(self, sid):
        return '%s:%s' % (self.key_prefix, sid)

    @staticmethod
    def gen_sid():
        return uuid4().get_hex()
