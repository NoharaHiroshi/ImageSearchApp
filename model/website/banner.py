# coding=utf-8

from sqlalchemy import Column, Integer, String, BigInteger
from sqlalchemy import UniqueConstraint
from model.base import Base, IdGenerator
from model.session import get_session
from model.image.image import Image


class Banner(Base):
    __tablename__ = 'website_banner'

    # 类型（按照链接的页面分类）：内容页、图片页、专题页
    TYPE_CONTENT_PAGE, TYPE_IMG_PAGE, TYPE_SERIES_PAGE = range(3)

    id = Column(BigInteger, default=IdGenerator.gen, primary_key=True)
    # 名称
    name = Column(String(20), index=True)
    # 图片id
    img_id = Column(BigInteger, nullable=False, index=True)
    # 背景颜色
    background_color = Column(String(10), nullable=False)
    # 类型
    type = Column(Integer, default=TYPE_CONTENT_PAGE, index=True)
    # 关联对象
    connect_id = Column(BigInteger, nullable=False, index=True)
    # 关联名称
    connect_name = Column(String(60), index=True)

    def get_banner_img(self, db_session):
        img = db_session.query(Image).get(self.img_id)
        if img:
            return img.img_full_url
        else:
            return ''

    @property
    def type_text(self):
        s = {
            self.TYPE_CONTENT_PAGE: u'内容页',
            self.TYPE_IMG_PAGE: u'图片页',
            self.TYPE_SERIES_PAGE: u'专题页'
        }
        return s.get(self.type, u'未知链接类型')

    def to_dict(self):
        return {
            'id': str(self.id),
            'img_id': str(self.img_id),
            'background_color': self.background_color,
            'name': self.name,
            'type': self.type,
            'type_text': self.type_text,
            'connect_id': str(self.connect_id),
            'connect_name': self.connect_name,
            'created_date': self.created_date.strftime('%Y-%m-%d %H:%M:%S'),
            'modified_date': self.modified_date.strftime('%Y-%m-%d %H:%M:%S'),
        }