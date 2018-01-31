# coding=utf-8

from sqlalchemy import Column, Integer, String, BigInteger
from model.base import Base, IdGenerator

from model.session import get_session


class Customer(Base):
    __tablename__ = 'website_customer'

    id = Column(BigInteger, default=IdGenerator.gen, primary_key=True)
    name = Column(String(45), nullable=False, index=True)
    # 微信登陆接口预留
    open_id = Column(String(225))
    phone = Column(String(45), index=True)
    email = Column(String(45), index=True)

    def to_dict(self):
        return {
            'id': str(self.id),
            'name': self.name,
            'open_id': self.open_id,
            'phone': self.phone,
            'email': self.email
        }