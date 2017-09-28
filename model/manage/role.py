# coding=utf-8

from sqlalchemy import Column, Integer, String, BigInteger
from model.base import Base, IdGenerator


class Role(Base):
    __tablename__ = 'manage_role'

    id = Column(BigInteger, default=IdGenerator.gen, primary_key=True)
    # 角色名称
    name = Column(String(50), nullable=False, index=True)
    # 描述
    desc = Column(String(225))

    def to_dict(self):
        return {
            'id': str(self.id),
            'name': self.name,
            'desc': self.desc
        }


class UserRole(Base):
    __tablename__ = 'manage_user_role'

    id = Column(BigInteger, default=IdGenerator.gen, primary_key=True)
    # 用户ID
    user_id = Column(BigInteger, nullable=False, index=True)
    # 角色ID
    role_id = Column(BigInteger, nullable=False, index=True)

