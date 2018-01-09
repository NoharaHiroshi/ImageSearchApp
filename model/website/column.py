# coding=utf-8

from sqlalchemy import Column, Integer, String, BigInteger
from sqlalchemy import UniqueConstraint
from model.base import Base, IdGenerator
from model.session import get_session
from model.image.image import Image


class WebsiteColumn(Base):
    __tablename__ = 'website_column'

    __table_args__ = (
        UniqueConstraint('ranking', name='ranking'),
    )

    id = Column(BigInteger, default=IdGenerator.gen, primary_key=True)
    # 名称
    name = Column(String(10), nullable=False, index=True)
    # 副名称
    sub_title = Column(String(60))
    # 排序
    ranking = Column(Integer, nullable=False, index=True)

    def to_dict(self):
        return {
            'id': str(self.id),
            'name': self.name,
            'sub_title': self.sub_title,
            'ranking': self.ranking
        }


class WebsiteColumnSeriesRel(Base):
    __tablename__ = 'website_column_series_rel'

    # 默认链接专题
    # 类型：首页隐藏、首页显示
    TYPE_HIDDEN, TYPE_SHOW = range(2)

    id = Column(BigInteger, default=IdGenerator.gen, primary_key=True)
    # 栏目ID
    column_id = Column(BigInteger, nullable=False, index=True)
    # 系列ID
    series_id = Column(BigInteger, nullable=False, index=True)
    # 首页展示类型
    type = Column(Integer, default=TYPE_HIDDEN)

    @property
    def type_text(self):
        s = {
            self.TYPE_HIDDEN: u'隐藏',
            self.TYPE_SHOW: u'显示'
        }
        return s.get(self.type, u'未知')

    def to_dict(self):
        return {
            'id': str(self.id),
            'column_id': str(self.column_id),
            'series_id': str(self.series_id),
            'type': self.type,
            'type_text': self.type_text
        }

