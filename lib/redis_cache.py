# coding=utf-8
u"""
redis缓存包装器
主要是将函数执行的返回结果进行缓存

"""
from datetime import timedelta
from functools import wraps
import hashlib
import redis
import ujson as json


class RedisCache(object):
    def __init__(self, host, port, db):
        self.redis = redis.Redis(
            host=host,
            port=port,
            db=db
        )

    @staticmethod
    def join_cache_key(*keys):
        return '#'.join([str(key) for key in keys])

    @staticmethod
    def gen_md5_key(str_key):
        return hashlib.md5(str_key).hexdigest()

    def store(self, func):
        @wraps(func)
        def new_func(*args, **kwargs):
            str_key = self.join_cache_key(func.func_name, *args[1:])
            md5_key = self.gen_md5_key(str_key)
            cache = self.redis.get(md5_key)
            if cache:
                return json.loads(cache)
            ret = func(*args, **kwargs)
            cache = ret
            self.redis.setex(md5_key, json.dumps(ret), int(timedelta(days=1).total_seconds()))
            return cache

        return new_func

    def flush_db(self):
        self.redis.flushdb()