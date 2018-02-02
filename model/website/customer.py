# coding=utf-8

from flask.ext.login import UserMixin, AnonymousUserMixin
from sqlalchemy import Column, Integer, String, BigInteger
from model.base import Base, IdGenerator

from model.session import get_session


class Customer(Base, UserMixin):
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

if __name__ == '__main__':
    with get_session() as db_session:
        customer = Customer()
        customer.name = u'小新'
        customer.phone = u'18222109895'
        db_session.add(customer)
        db_session.commit()