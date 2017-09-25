# coding=utf-8

import redis
from redis_store.config import config

common_redis = redis.StrictRedis(host=config.REDIS_HOST, port=config.REDIS_PORT, db=config.COMMON_DB)