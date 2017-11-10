# coding=utf-8

from sqlalchemy import Column, Integer, String, BigInteger
from model.base import Base, IdGenerator


class ImageTags(Base):
    __tablename__ = 'image_tags'

    id = Column(BigInteger, default=IdGenerator.gen, index=True)
    name = Column(String(30), nullable=False, index=True)

    def to_dict(self):
        return {
            'id': str(self.id),
            'name': self.name
        }


class ImageTagsRel(Base):
    __tablename__ = 'image_tags_rel'

    # 图片、图片系列
    TYPE_IMAGE, TYPE_IMAGE_SERIES = range(2)

    id = Column(BigInteger, default=IdGenerator.gen, index=True)
    # 类型
    type = Column(Integer, default=TYPE_IMAGE, index=True)
    # 标签ID
    tag_id = Column(BigInteger, nullable=False, index=True)
    # 图片ID/图片系列ID
    image_id = Column(BigInteger, nullable=False, index=True)

    def to_dict(self):
        return {
            'id': str(self.id),
            'type': self.type,
            'tag_id': str(self.tag_id),
            'image_id': str(self.image_id)
        }