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

    @classmethod
    def get_func_select_info(cls):
        with get_session() as db_session:
            all_func = db_session.query(cls).all()
            all_func_list = list()
            for func in all_func:
                func_dict = func.to_dict()
                all_func_list.append(func_dict)
        return all_func_list


class MenuFunc(Base):
    __tablename__ = 'manage_menu_func'

    id = Column(BigInteger, default=IdGenerator.gen, primary_key=True)
    # 别名
    name = Column(String(50), nullable=False, index=True)
    # 菜单ID
    menu_id = Column(BigInteger, nullable=False, index=True)
    # 功能ID
    func_id = Column(BigInteger, nullable=False, index=True)
    # 菜单功能代码
    menu_func_code = Column(String(50), nullable=False, index=True)

    def to_dict(self):
        return {
            'id': str(self.id),
            'name': self.name,
            'menu_id': str(self.menu_id),
            'func_id': str(self.func_id),
            'menu_func_code': self.menu_func_code,
            'created_date': self.created_date.strftime('%Y-%m-%d %H:%M:%S'),
            'modified_date': self.modified_date.strftime('%Y-%m-%d %H:%M:%S'),
        }

if __name__ == '__main__':
    pass
