# coding=utf-8

from sqlalchemy import Column, Integer, String, BigInteger
from model.base import Base, IdGenerator


class ImageSeries(Base):
    __tablename__ = 'image_series'

    id = Column(BigInteger, default=IdGenerator.gen, primary_key=True)
    # 名称
    name = Column(String(100), index=True)
    # 作者
    author = Column(String(100), default=u'未知', index=True)
    # 描述
    desc = Column(String(255))
    # 标签
    tag_ids = Column(String(255))
    # 标签名
    tag_names = Column(String(255))

    def to_dict(self):
        return {
            'id': str(self.id),
            'author': self.author,
            'desc': self.desc,
            'tag_ids': self.tag_ids,
            'tag_names': self.tag_names
        }