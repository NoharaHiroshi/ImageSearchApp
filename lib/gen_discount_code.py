# encoding=utf-8

"""
    个人支付没有找到合适的第三方支付，只能使用券码的方式，
    用户购买券码后，兑换券码，绑定权益。
    我能怎么办呢？我也很无奈╮(─▽─)╭
"""

import time
from model.base import IdGenerator


def gen_discount_code():
    code = int(time.gmtime())
    return code

if __name__ == '__main__':
    print gen_discount_code()