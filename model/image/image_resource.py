# encoding=utf-8

# coding=utf-8

from sqlalchemy import Column, Integer, String, BigInteger
from model.base import Base, IdGenerator
from model.session import get_session


# 当前模型主要用于存储一些辅助性图片，例如专题封面，轮播图图片等
class ImageResource(Base):
    __tablename__ = 'image_resource'

    TYPE_COMMON, TYPE_SERIES_BACKGROUND, TYPE_BANNER = range(3)

    id = Column(BigInteger, default=IdGenerator.gen, primary_key=True)
    # 名称
    name = Column(String(100), index=True, nullable=True)
    # 用途类型
    type = Column(Integer, index=True, default=TYPE_COMMON)
    # 图片url
    url = Column(String(255), nullable=False)
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
        img_url = 'resource/resource_img/%s.%s' % (self.url, self.format.lower())
        return img_url

    def to_dict(self):
        return {
            'id': str(self.id),
            'name': self.name,
            'format': self.format,
            'type': self.type,
            'url': self.url,
            'full_url': self.img_full_url,
            'width': self.width,
            'height': self.height,
            'mode': self.mode,
            'created_date': self.created_date.strftime('%Y-%m-%d %H:%M:%S'),
            'modified_date': self.modified_date.strftime('%Y-%m-%d %H:%M:%S'),
        }