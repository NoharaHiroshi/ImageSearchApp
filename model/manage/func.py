# coding=utf-8

from sqlalchemy import Column, Integer, String, BigInteger
from model.base import Base, IdGenerator

from model.session import get_session


class Func(Base):
    __tablename__ = 'manage_func'

    id = Column(BigInteger, default=IdGenerator.gen, primary_key=True)
    # 名称
    name = Column(String(50), nullable=False, index=True)
    # 代码
    code = Column(String(50), nullable=False, index=True)
    # 描述
    desc = Column(String(100))

    def to_dict(self):
        return {
            'id': str(self.id),
            'name': self.name,
            'code': self.code,
            'desc': self.desc
        }


class MenuFunc(Base):
    __tablename__ = 'manage_menu_func'

    id = Column(BigInteger, default=IdGenerator.gen, primary_key=True)
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

if __name__ == '__main__':
    with get_session() as db_session:
        func = Func()
        func.name = u'查看列表'
        func.code = u'list'
        func.desc = u'查看数据权限'
        db_session.add(func)
        db_session.commit()
