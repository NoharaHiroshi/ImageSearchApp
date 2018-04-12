# coding=utf-8

import datetime

from sqlalchemy import Column, Integer, String, BigInteger, DateTime
from model.base import Base, IdGenerator

from model.session import get_session


class Discount(Base):
    __tablename__ = 'website_discount'

    # 状态
    STATUS_OFF, STATUS_ON = range(2)

    id = Column(BigInteger, default=IdGenerator.gen, primary_key=True)
    # 状态
    status = Column(Integer, default=STATUS_OFF, index=True)
    # 权益名称
    name = Column(String(40), nullable=False, index=True)
    # 每天下载的次数, 0为不限制
    times = Column(Integer, nullable=False, index=True)
    # 价格
    price = Column(Integer, nullable=False, index=True)
    # 生效天数
    effect_days = Column(Integer, nullable=False, index=True)
    # 权益图片
    image_id = Column(BigInteger, nullable=False, index=True)
    # 权益等级
    level = Column(Integer, nullable=False, index=True)
    # 权益描述
    description = Column(String(225))

    @property
    def status_text(self):
        if self.status == self.STATUS_OFF:
            return u'关闭'
        else:
            return u'开启'

    def to_dict(self):
        return {
            'id': str(self.id),
            'status': self.status,
            'status_text': self.status_text,
            'name': self.name,
            'times': self.times,
            'price': self.price,
            'level': self.level,
            'image_id': str(self.image_id),
            'effect_days': self.effect_days,
            'description': self.description,
            'created_date': self.created_date.strftime('%Y-%m-%d %H:%M:%S'),
            'modified_date': self.modified_date.strftime('%Y-%m-%d %H:%M:%S'),
        }


class CustomerDiscount(Base):
    __tablename__ = 'website_customer_discount'

    # 手动、充值
    TYPE_MANUAL, TYPE_AUTO = range(2)

    id = Column(BigInteger, default=IdGenerator.gen, primary_key=True)
    # 会员ID
    customer_id = Column(BigInteger, nullable=False, index=True)
    # 类型
    type = Column(Integer, default=TYPE_AUTO, index=True)
    # 权益ID
    discount_id = Column(BigInteger, nullable=False, index=True)
    # 生效日期
    effect_start = Column(DateTime, default=datetime.datetime.now, index=True)
    # 生效时间
    effect_days = Column(Integer, nullable=False, index=True)

    def to_dict(self):
        return {
            'id': str(self.id),
            'type': self.type,
            'customer_id': str(self.customer_id),
            'discount_id': str(self.discount_id),
            'effect_start': self.effect_start.strftime('%Y-%m-%d %H:%M:%S'),
            'effect_days': self.effect_days,
            'created_date': self.created_date.strftime('%Y-%m-%d %H:%M:%S'),
            'modified_date': self.modified_date.strftime('%Y-%m-%d %H:%M:%S'),
        }