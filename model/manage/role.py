# coding=utf-8

from sqlalchemy import Column, Integer, String, BigInteger
from model.base import Base, IdGenerator
from model.session import get_session


class Role(Base):
    __tablename__ = 'manage_role'

    id = Column(BigInteger, default=IdGenerator.gen, primary_key=True)
    # 角色名称
    name = Column(String(50), nullable=False, index=True)
    # 描述
    desc = Column(String(225))

    # 获取所有Role实例
    @classmethod
    def get_all_role(cls):
        with get_session() as db_session:
            all_role_list = list()
            all_role = db_session.query(cls).all()
            for role in all_role:
                role_dict = role.to_dict()
                all_role_list.append(role_dict)
        return all_role_list

    def to_dict(self):
        return {
            'id': str(self.id),
            'name': self.name,
            'desc': self.desc,
            'created_date': self.created_date.strftime('%Y-%m-%d %H:%M:%S'),
            'modified_date': self.modified_date.strftime('%Y-%m-%d %H:%M:%S'),
        }


class UserRole(Base):
    __tablename__ = 'manage_user_role'

    id = Column(BigInteger, default=IdGenerator.gen, primary_key=True)
    # 用户ID
    user_id = Column(BigInteger, nullable=False, index=True)
    # 角色ID
    role_id = Column(BigInteger, nullable=False, index=True)

