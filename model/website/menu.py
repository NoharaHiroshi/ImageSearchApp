# coding=utf-8

from sqlalchemy import Column, Integer, String, BigInteger
from sqlalchemy import UniqueConstraint
from model.base import Base, IdGenerator
from model.session import get_session


class WebsiteMenu(Base):
    __tablename__ = 'website_menu'

    # 类型（按照链接的页面分类）：内容页、图片页
    # 详细解释一下，防止忘记：通过menu类别的不同，调用不同模板
    # 无跳转：无跳转页面
    # 内容页：例如活动公告、关于网站等已文字为主的页面
    # 图片页：图片列表页，展示某一类、某一专题、某一标签的图片列表
    # 专题页：用来展示某一类相关专题
    TYPE_NULL, TYPE_CONTENT_PAGE, TYPE_IMG_PAGE, TYPE_SERIES_PAGE = range(4)

    id = Column(BigInteger, default=IdGenerator.gen, primary_key=True)
    # 名称
    name = Column(String(50), nullable=False, index=True)
    # 链接类型
    type = Column(Integer, default=TYPE_NULL, index=True)
    # 关联id
    connect_id = Column(BigInteger, index=True)
    # 关联名称
    connect_name = Column(String(60), index=True)
    # 排序
    sort = Column(Integer, default=0, index=True)
    # 父级ID
    parent_id = Column(BigInteger, default=0, index=True)
    # 图标信息
    icon_info = Column(String(60))

    @property
    def type_text(self):
        s = {
            self.TYPE_NULL: u'无跳转',
            self.TYPE_CONTENT_PAGE: u'内容页',
            self.TYPE_IMG_PAGE: u'图片列表页',
            self.TYPE_SERIES_PAGE: u'专题列表页'
        }
        return s.get(self.type, u'未知链接类型')

    @classmethod
    def set_count(cls, parent_id=0, sort=None):
        with get_session() as db_session:
            if sort:
                return sort
            else:
                _menu = db_session.query(cls).filter(
                    cls.parent_id == parent_id
                ).order_by(-WebsiteMenu.sort).first()
                if _menu:
                    return _menu.sort + 1
                else:
                    return 0

    @property
    def sub_menus(self):
        with get_session() as db_session:
            sub_menus = db_session.query(WebsiteMenu).filter(
                WebsiteMenu.parent_id == self.id,
            ).order_by(WebsiteMenu.sort).all()
            if sub_menus:
                return [sub_menu.to_dict() for sub_menu in sub_menus]
            else:
                return []

    # 获取带有前缀的菜单列表
    @classmethod
    def get_menu_select_info(cls, menu_select_info=list(), parent_id=0, level=0):
        with get_session() as db_session:
            menus = db_session.query(WebsiteMenu).filter(
                WebsiteMenu.parent_id == parent_id
            ).order_by(WebsiteMenu.sort).all()
            for menu in menus:
                if menu:
                    menu_dict = menu.to_dict()
                    menu_dict.update({
                        'menu_name': ''.join(['| ', '---- ' * level, menu.name]),
                    })
                    menu_select_info.append(menu_dict)
                    _level = level + 1
                    cls.get_menu_select_info(menu_select_info, menu.id, _level)
                else:
                    continue
        return menu_select_info

    def to_dict(self):
        return {
            'id': str(self.id),
            'name': self.name,
            'type': self.type,
            'type_text': self.type_text,
            'connect_id': str(self.connect_id),
            'connect_name': self.connect_name,
            'sort': self.sort,
            'parent_id': str(self.parent_id),
            'icon_info': self.icon_info,
            'sub_menus': self.sub_menus,
            'created_date': self.created_date.strftime('%Y-%m-%d %H:%M:%S'),
            'modified_date': self.modified_date.strftime('%Y-%m-%d %H:%M:%S'),
        }
