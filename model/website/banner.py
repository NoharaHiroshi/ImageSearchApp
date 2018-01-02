# coding=utf-8

from sqlalchemy import Column, Integer, String, BigInteger
from sqlalchemy import UniqueConstraint
from model.base import Base, IdGenerator
from model.session import get_session


class Banner(Base):
    __tablename__ = 'website_banner'

    # 类型（按照链接的页面分类）：内容页、图片页
    TYPE_CONTENT_INDEX, TYPE_IMG_PAGE = range(2)

    id = Column(BigInteger, default=IdGenerator.gen, primary_key=True)
    # 名称
    name = Column(String(20), index=True)
    # 图片url
    url = Column(String(255), nullable=False)
    # 类型
    type = Column(Integer, default=TYPE_CONTENT_INDEX, index=True)
    # 关联对象
    connect_id = Column(BigInteger, nullable=False, index=True)
    # 关联名称
    connect_name = Column(String(60), index=True)
    # 格式
    format = Column(String(10), nullable=False, default=u'UNKNOWN')
    # 宽
    width = Column(Integer)
    # 高
    height = Column(Integer)
    # 模式
    mode = Column(String(10))

    @property
    def img_full_url(self):
        img_url = 'resource/img/banner/%s.%s' % (self.url, self.format.lower())
        return img_url

    @property
    def type_text(self):
        s = {
            self.TYPE_SECOND_INDEX: u'内容页',
            self.TYPE_DEFAULT_PAGE: u'图片页'
        }
        return s.get(self.type)

    def to_dict(self):
        return {
            'id': str(self.id),
            'name': self.name,
            'format': self.format,
            'type': self.type,
            'type_text': self.type_text,
            'connect_id': str(self.connect_id),
            'connect_name': self.connect_name,
            'url': self.url,
            'width': self.width,
            'height': self.height,
            'mode': self.mode,
            'img_full_url': self.img_full_url
        }