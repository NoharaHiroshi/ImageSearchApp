# coding=utf-8

from sqlalchemy import Column, Integer, String, BigInteger
from sqlalchemy import UniqueConstraint
from model.base import Base, IdGenerator
from model.session import get_session


class Banner(Base):
    __tablename__ = 'website_banner'

    # 类型（按照链接的页面分类）：内容页、图片页
    TYPE_CONTENT_PAGE, TYPE_IMG_PAGE = range(2)

    id = Column(BigInteger, default=IdGenerator.gen, primary_key=True)
    # 名称
    name = Column(String(20), index=True)
    # 图片id
    img_id = Column(BigInteger, nullable=False, index=True)
    # 类型
    type = Column(Integer, default=TYPE_CONTENT_PAGE, index=True)
    # 关联对象
    connect_id = Column(BigInteger, nullable=False, index=True)
    # 关联名称
    connect_name = Column(String(60), index=True)

    @property
    def type_text(self):
        s = {
            self.TYPE_SECOND_PAGE: u'内容页',
            self.TYPE_DEFAULT_PAGE: u'图片页'
        }
        return s.get(self.type)

    def to_dict(self):
        return {
            'id': str(self.id),
            'img_id': str(self.img_id),
            'name': self.name,
            'type': self.type,
            'type_text': self.type_text,
            'connect_id': str(self.connect_id),
            'connect_name': self.connect_name,
        }