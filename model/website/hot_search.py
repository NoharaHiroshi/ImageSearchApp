# coding=utf-8

from sqlalchemy import Column, Integer, String, BigInteger
from sqlalchemy import UniqueConstraint
from model.base import Base, IdGenerator
from model.session import get_session


class WebsiteHotSearch(Base):
    __tablename__ = 'website_hot_search'

    __table_args__ = (
        UniqueConstraint('ranking', name='ranking'),
    )

    # 热搜关键词状态： 关闭、开启
    STATUS_CLOSE, STATUS_NORMAL = range(2)

    id = Column(BigInteger, default=IdGenerator.gen, primary_key=True)
    # 关键词名
    name = Column(String(50), nullable=False, index=True)
    # 关联id
    connect_id = Column(BigInteger, nullable=False, index=True)
    # 状态
    status = Column(Integer, default=STATUS_CLOSE, index=True)
    # 排名
    ranking = Column(Integer, default=1, index=True)

    @property
    def status_text(self):
        s = {
            self.STATUS_CLOSE: u'关闭',
            self.STATUS_NORMAL: u'开启'
        }
        return s.get(self.status)

    def to_dict(self):
        return {
            'id': str(self.id),
            'name': self.name,
            'connect_id': str(self.connect_id),
            'status': self.status,
            'status_text': self.status_text,
            'ranking': self.ranking,
            'created_date': self.created_date.strftime('%Y-%m-%d %H:%M:%S'),
            'modified_date': self.modified_date.strftime('%Y-%m-%d %H:%M:%S'),
        }