# coding=utf-8

import os
import datetime
import time
import threading
import hashlib
from sqlalchemy import Column, DateTime
from sqlalchemy.ext.declarative import declarative_base
from model.config import config

class IdGenerator(object):
    _inc = 0
    _inc_lock = threading.Lock()

    @staticmethod
    def gen():
        # 32位时间戳
        new_id = (int(time.time()) & 0xffffffff) << 32
        # 8位进程号
        new_id |= (os.getpid() & 0xff) << 16
        # 16位自增数
        IdGenerator._inc_lock.acquire()
        new_id |= IdGenerator._inc
        IdGenerator._inc = (IdGenerator._inc + 1) & 0xffff
        IdGenerator._inc_lock.release()
        return new_id


class HashName(object):
    @staticmethod
    def gen(_id, info=''):
        hash_name = hashlib.md5(str(_id) + info + config.SECRET_KEY).hexdigest()
        return hash_name


class TBase(object):

    created_date = Column(DateTime, default=datetime.datetime.now, index=True)
    modified_date = Column(DateTime, default=datetime.datetime.now, index=True)

Base = declarative_base(cls=TBase)

if __name__ == '__main__':
    _id = '6488571505419485184'
    hash_name = HashName.gen(_id, 'resource')
    print hash_name