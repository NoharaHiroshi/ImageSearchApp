# coding=utf-8

import datetime

from sqlalchemy import Column, Integer, String, BigInteger, DateTime
from model.base import Base, IdGenerator

from model.session import get_session


class DiscountCode(Base):
    __tablename__ = 'website_discount_code'

    # 状态: 未使用、已使用
    STATUS_NEW, STATUS_USED = range(2)

    id = Column(BigInteger, default=IdGenerator.gen, primary_key=True)
    # 状态
    status = Column(Integer, default=STATUS_NEW, index=True)
    # 券码
    code = Column(String, nullable=False, index=True)
    # 关联权益
    discount_id = Column(BigInteger, nullable=False, index=True)
    # 关联会员
    customer_id = Column(BigInteger, index=True)
    # 使用时间
    use_datetime = Column(DateTime, index=True)
    # 生成批次
    history_id = Column(BigInteger, index=True, nullable=False)

    def to_dict(self):
        return {
            'id': str(self.id),
            'status': self.status,
            'code': self.code,
            'discount_id': str(self.discount_id),
            'customer_id': str(self.customer_id),
            'history_id': str(self.history_id),
            'use_datetime': self.use_datetime.strftime('%Y-%m-%d %H:%M:%S')
        }


class DisocuntCodeGenHistory(Base):
    __tablename__ = 'website_discount_gen_history'

    id = Column(BigInteger, default=IdGenerator.gen, primary_key=True)
    # 生成数量
    gen_num = Column(Integer, index=True)
    # 生成人员
    creator_id = Column(BigInteger, nullable=False, index=True)
    # 生成人员名称
    creator_name = Column(String, nullable=False, index=True)

    def to_dict(self):
        return {
            'id': str(self.id),
            'gen_num': self.gen_num,
            'creator_id': str(self.creator_id),
            'creator_name': self.creator_name
        }