# coding=utf-8

import os
from sqlalchemy import Column, Integer, String, BigInteger
from model.base import Base, IdGenerator


class Image(Base):
    __tablename__ = 'image'

    # 类型： 通常、封面、轮播图
    TYPE_COMMON, TYPE_COVER, TYPE_BANNER = range(3)

    id = Column(BigInteger, default=IdGenerator.gen, primary_key=True)
    # 名称
    name = Column(String(100), index=True)
    # 作者
    author = Column(String(100), default=u'未知', index=True)
    # 类型
    type = Column(Integer, default=TYPE_COMMON)
    # 图片url
    url = Column(String(255), nullable=False)
    # 预览图
    preview_url = Column(String(255), nullable=False)
    # 缩略图
    thumbnail_url = Column(String(255), nullable=False)
    # 格式
    format = Column(String(10), nullable=False, default=u'UNKNOWN')
    # 描述
    desc = Column(String(255))
    # 宽
    width = Column(Integer)
    # 高
    height = Column(Integer)
    # 模式
    mode = Column(String(10))
    # 浏览次数
    view_count = Column(Integer, default=0, nullable=False, index=True)

    @property
    def img_full_url(self):
        img_url = 'resource/img/original/%s.%s' % (self.url, self.format.lower())
        return img_url

    @property
    def img_preview_url(self):
        img_url = 'resource/img/preview/%s.%s' % (self.preview_url, self.format.lower())
        return img_url

    @property
    def img_thumb_url(self):
        img_url = 'resource/img/thumbnail/%s.%s' % (self.thumbnail_url, self.format.lower())
        return img_url

    def to_dict(self):
        return {
            'id': str(self.id),
            'name': self.name,
            'author': self.author,
            'preview_url': self.preview_url,
            'thumbnail_url': self.thumbnail_url,
            'format': self.format,
            'type': self.type,
            'desc': self.desc,
            'width': self.width,
            'height': self.height,
            'mode': self.mode,
            'img_preview_url': self.img_preview_url,
            'img_thumbnail_url': self.img_thumb_url,
            'created_date': self.created_date.strftime('%Y-%m-%d %H:%M:%S'),
            'modified_date': self.modified_date.strftime('%Y-%m-%d %H:%M:%S'),
            'view_count': self.view_count
        }