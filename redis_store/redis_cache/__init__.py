# coding=utf-8

import redis
from redis_store.config import config

# 通用redis
common_redis = redis.StrictRedis(host=config.REDIS_HOST, port=config.REDIS_PORT, db=config.COMMON_DB)
# 代理redis
proxy_redis = redis.StrictRedis(host=config.REDIS_HOST, port=config.REDIS_PORT, db=config.PROXY_DB)