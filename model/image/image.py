# coding=utf-8

import os
from sqlalchemy import Column, Integer, String, BigInteger
from model.base import Base, IdGenerator
from manage_app.config import config


class Image(Base):
    __tablename__ = 'image'

    id = Column(BigInteger, default=IdGenerator.gen, primary_key=True)
    # 名称
    name = Column(String(100), index=True)
    # 作者
    author = Column(String(100), default=u'未知', index=True)
    # 图片url
    url = Column(String(255), nullable=False)
    # 预览图
    preview_url = Column(String(255), nullable=False)
    # 缩略图
    thumbnail_url = Column(String(255), nullable=False)
    # 类型
    format = Column(String(10), nullable=False, default=u'UNKNOWN')
    # 描述
    desc = Column(String(255))
    # 系列ID
    series_id = Column(BigInteger)
    # 系列名称
    series_name = Column(String(100))
    # 标签
    tag_ids = Column(String(255))
    # 标签名
    tag_names = Column(String(255))
    # 宽
    width = Column(Integer)
    # 高
    height = Column(Integer)
    # 模式
    mode = Column(String(10))

    @property
    def img_full_url(self):
        img_url = 'resource/img/original/%s.%s' %(self.url, self.format.lower())
        return img_url

    @property
    def img_preview_url(self):
        img_url = 'resource/img/preview/%s.%s' %(self.preview_url, self.format.lower())
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
            'desc': self.desc,
            'series_id': str(self.series_id),
            'series_name': self.series_name,
            'tag_ids': self.tag_ids,
            'tag_names': self.tag_names,
            'width': self.width,
            'height': self.height,
            'mode': self.mode,
            'img_preview_url': self.img_preview_url,
            'img_thumbnail_url': self.img_thumb_url
        }