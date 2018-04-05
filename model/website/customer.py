# coding=utf-8

from flask.ext.login import UserMixin, AnonymousUserMixin
from sqlalchemy import Column, Integer, String, BigInteger
from model.base import Base, IdGenerator
from lib.aes_encrypt import AESCipher

from model.session import get_session


class Customer(Base, UserMixin):
    __tablename__ = 'website_customer'

    id = Column(BigInteger, default=IdGenerator.gen, primary_key=True)
    email = Column(String(45), index=True, nullable=False, unique=True)
    name = Column(String(45), nullable=False, index=True)
    phone = Column(String(45), index=True)
    open_id = Column(String(225))
    password = Column(String(100), nullable=False)
    qq = Column(String(20))

    def to_dict(self):
        return {
            'id': str(self.id),
            'name': self.name,
            'open_id': self.open_id,
            'email': self.email,
            'phone': self.phone,
            'qq': self.qq
        }

if __name__ == '__main__':
    with get_session() as db_session:
        customer = Customer()
        customer.name = u'小新'
        customer.phone = u'18222109895'
        customer.email = u'Lands@qq.com'
        customer.password = AESCipher.encrypt(u'123456')
        db_session.add(customer)
        db_session.commit()