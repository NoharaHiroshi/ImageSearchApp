# encoding=utf-8

"""
    个人支付没有找到合适的第三方支付，只能使用券码的方式，
    用户购买券码后，兑换券码，绑定权益。
    我能怎么办呢？我也很无奈╮(─▽─)╭
"""

import string
import time
import random
from model.base import IdGenerator


def gen_discount_code():
    code = list(str(int(time.time()))[2:-2])
    insert_int = random.randint(0, 7)
    for i in range(6):
        code.insert(insert_int, random.choice(string.ascii_lowercase))
    return ''.join(code).upper()

if __name__ == '__main__':
    print gen_discount_code()