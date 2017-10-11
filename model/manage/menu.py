# coding=utf-8

from sqlalchemy import Column, Integer, String, BigInteger
from sqlalchemy import UniqueConstraint
from model.base import Base, IdGenerator
from model.session import get_session


class Menu(Base):
    __tablename__ = 'manage_menu'

    __table_args__ = (
        UniqueConstraint('code', name='code'),
    )

    id = Column(BigInteger, default=IdGenerator.gen, primary_key=True)
    # 名称
    name = Column(String(50), nullable=False, index=True)
    # 代码
    code = Column(String(50), nullable=False, index=True)
    # 排序
    sort = Column(Integer, default=0, index=True)
    # 父级ID
    parent_id = Column(BigInteger, default=0, index=True)
    # 图标信息
    icon_info = Column(String(60))
    # url
    url = Column(String(50))

    @classmethod
    def set_count(cls, sort=None):
        with get_session() as db_session:
            if sort:
                return sort
            else:
                _menu = db_session.query(cls).order_by(-Menu.sort).first()
                if _menu:
                    return _menu.sort + 1
                else:
                    return 0

    @property
    def sub_menus(self):
        with get_session() as db_session:
            sub_menus = db_session.query(Menu).filter(
                Menu.parent_id == self.id,
            ).order_by(Menu.sort).all()
            if sub_menus:
                return [sub_menu.to_dict() for sub_menu in sub_menus]
            else:
                return []

    def to_dict(self):
        return {
            'id': str(self.id),
            'name': self.name,
            'code': self.code,
            'sort': self.sort,
            'parent_id': str(self.parent_id),
            'icon_info': self.icon_info,
            'url': self.url,
            'sub_menus': self.sub_menus
        }

if __name__ == '__main__':
    with get_session() as _db_session:
        menu = Menu()
        menu.name = '菜单配置'
        menu.code = 'menu_conf'
        menu.sort = Menu.set_count()
        menu.parent_id = 6475635828428636160
        _db_session.add(menu)
        _db_session.commit()



