# coding=utf-8

from sqlalchemy import Column, Integer, String, BigInteger
from model.base import Base, IdGenerator


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
            'mode': self.mode
        }