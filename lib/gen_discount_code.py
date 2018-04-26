# encoding=utf-8

"""
    个人支付没有找到合适的第三方支付，只能使用券码的方式，
    用户购买券码后，兑换券码，绑定权益。
    我能怎么办呢？我也很无奈╮(─▽─)╭
"""

import string
import time
import traceback
import random
from model.base import IdGenerator
from model.website.discount_code import DisocuntCodeGenHistory, DiscountCode
from model.manage.user import User
from model.session import get_session


def gen_discount_code():
    code = list(str(int(time.time()))[2:-2])
    insert_int = random.randint(0, 7)
    for i in range(6):
        code.insert(insert_int, random.choice(string.ascii_lowercase))
    return ''.join(code).upper()


def bath_gen_discount_code(email, num, discount_id):
    try:
        with get_session() as db_session:
            user = db_session.query(User).filter(
                User.email == email
            ).first()
            if user:
                _id = IdGenerator.gen()
                discount_history = DisocuntCodeGenHistory()
                discount_history.id = _id
                discount_history.creator_id = user.id
                discount_history.gen_num = num
                discount_history.creator_name = user.name
                db_session.add(discount_history)
                for i in range(num):
                    discount_code = DiscountCode()
                    discount_code.discount_id = discount_id
                    discount_code.code = gen_discount_code()
                    discount_code.history_id = _id
                    discount_code.status = DiscountCode.STATUS_NEW
                    db_session.add(discount_code)
            db_session.commit()
    except Exception as e:
        print traceback.format_exc(e)


if __name__ == '__main__':
    bath_gen_discount_code('380788433@qq.com', 50, 6543399288390811648)