# coding=utf-8

from sqlalchemy import Column, Integer, String, BigInteger
from model.base import Base, IdGenerator


class Icon(Base):
    __tablename__ = 'icon'

    UNKNOWN, JPG, PNG, TIFF, BMP, GIF, SVG, PSD, EPS, AI, OTHER = range(11)

    # 单色、多色
    SINGLE_COLOR, MULTI_COLOR = range(2)

    id = Column(BigInteger, default=IdGenerator.gen, primary_key=True)
    # 名称
    name = Column(String(100), index=True)
    # 作者
    author = Column(String(100), default=u'未知', index=True)
    # url
    url = Column(String(255), nullable=False)
    # 类型
    type = Column(Integer, nullable=False, default=UNKNOWN)
    # 色彩类型
    color_type = Column(Integer, default=SINGLE_COLOR, index=True)
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

    def to_dict(self):
        return {
            'id': str(self.id),
            'name': self.name,
            'author': self.author,
            'url': self.url,
            'type': self.type,
            'color_type': self.color_type,
            'desc': self.desc,
            'series_id': str(self.series_id),
            'series_name': self.series_name,
            'tag_ids': self.tag_ids,
            'tag_names': self.tag_names,
            'width': self.width,
            'height': self.height,
        }


