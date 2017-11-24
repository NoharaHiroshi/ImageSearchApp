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
    # 封面图
    cover_image_id = Column(BigInteger, index=True, nullable=False)

    def to_dict(self):
        return {
            'id': str(self.id),
            'author': self.author,
            'desc': self.desc,
            'tag_ids': self.tag_ids,
            'tag_names': self.tag_names,
            'cover_image_id': str(self.cover_image_id)
        }


class ImageSeriesRel(Base):
    __tablename__ = 'image_series_rel'

    id = Column(BigInteger, default=IdGenerator.gen, primary_key=True)
    # 图片ID
    image_id = Column(BigInteger, index=True)
    # 图片名称
    image_name = Column(String(100), index=True)
    # 系列ID
    image_series_id = Column(BigInteger, index=True)
    # 系列名称
    image_series_name = Column(String(100), index=True)

    def to_dict(self):
        return {
            'id': str(self.id),
            'image_id': str(self.image_id),
            'image_name': self.image_name,
            'image_series_id': str(self.iamge_series_id),
            'image_series_name': self.iamge_series_name
        }