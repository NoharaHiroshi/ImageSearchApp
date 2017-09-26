# coding=utf-8

from sqlalchemy import Column, Integer, String, BigInteger
from model.base import Base, IdGenerator


class Func(Base):
    __tablename__ = 'manage_func'

    id = Column(BigInteger, default=IdGenerator.gen, index=True)
    # 名称
    name = Column(String(50), nullable=False, index=True)
    # 代码
    code = Column(String(50), nullable=False, index=True)

    def to_dict(self):
        return {
            'id': str(self.id),
            'name': self.name,
            'code': self.code,
        }


class MenuFuncRel(Base):
    __tablename__ = 'manage_menu_func_rel'

    id = Column(BigInteger, default=IdGenerator.gen, index=True)
    # 别名
    name = Column(String(50), nullable=False, index=True)
    # 菜单ID
    menu_id = Column(BigInteger, nullable=False, index=True)
    # 功能ID
    func_id = Column(BigInteger, nullable=False, index=True)

    def to_dict(self):
        return {
            'id': str(self.id),
            'name': self.name,
            'menu_id': str(self.menu_id),
            'func_id': str(self.func_id)
        }