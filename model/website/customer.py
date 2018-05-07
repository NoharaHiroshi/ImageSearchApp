# coding=utf-8

from flask.ext.login import UserMixin, AnonymousUserMixin
from sqlalchemy import Column, Integer, String, BigInteger
from model.base import Base, IdGenerator
from lib.aes_encrypt import AESCipher

from model.session import get_session


class Customer(Base, UserMixin):
    __tablename__ = 'website_customer'

    # 是否通过验证：通过验证，未验证
    AUTH_NO, AUTH_YES = range(2)

    id = Column(BigInteger, default=IdGenerator.gen, primary_key=True)
    email = Column(String(45), index=True, nullable=False, unique=True)
    name = Column(String(45), nullable=False, index=True)
    phone = Column(String(45), index=True)
    open_id = Column(String(225))
    password = Column(String(100), nullable=False)
    qq = Column(String(20))
    # 是否通过邮箱验证
    is_auth = Column(Integer, default=AUTH_NO, index=True)

    def to_dict(self):
        return {
            'id': str(self.id),
            'name': self.name,
            'open_id': self.open_id,
            'email': self.email,
            'phone': self.phone,
            'qq': self.qq,
            'is_auth': self.is_auth,
            'created_date': self.created_date.strftime('%Y-%m-%d %H:%M:%S')
        }


class CustomerCollect(Base):
    __tablename__ = 'website_customer_collect'

    # 收藏类型: 图片、系列
    TYPE_IMAGE, TYPE_SERIES = range(2)

    id = Column(BigInteger, default=IdGenerator.gen, primary_key=True)
    type = Column(Integer, default=TYPE_IMAGE, index=True)
    customer_id = Column(BigInteger, nullable=False, index=True)
    collect_id = Column(BigInteger, nullable=False, index=True)

    def to_dict(self):
        return {
            'id': str(self.id),
            'type': self.type,
            'customer_id': str(self.customer_id),
            'collect_id': str(self.collect_id),
            'created_date': self.created_date.strftime('%Y-%m-%d %H:%M:%S'),
            'modified_date': self.modified_date.strftime('%Y-%m-%d %H:%M:%S')
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