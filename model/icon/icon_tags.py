# coding=utf-8

from sqlalchemy import Column, Integer, String, BigInteger
from model.base import Base, IdGenerator


class IconTags(Base):
    __tablename__ = 'icon_tags'

    id = Column(BigInteger, default=IdGenerator.gen, primary_key=True)
    name = Column(String(30), nullable=False, index=True)

    def to_dict(self):
        return {
            'id': str(self.id),
            'name': self.name
        }


class IconTagsRel(Base):
    __tablename__ = 'icon_tags_rel'

    # 图标、图标系列
    TYPE_ICON, TYPE_ICON_SERIES = range(2)

    id = Column(BigInteger, default=IdGenerator.gen, primary_key=True)
    # 类型
    type = Column(Integer, default=TYPE_ICON, index=True)
    # 标签ID
    tag_id = Column(BigInteger, nullable=False, index=True)
    # 图标ID/图标系列ID
    icon_id = Column(BigInteger, nullable=False, index=True)

    def to_dict(self):
        return {
            'id': str(self.id),
            'type': self.type,
            'tag_id': str(self.tag_id),
            'icon_id': str(self.icon_id)
        }