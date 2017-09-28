# coding=utf-8

from sqlalchemy import Column, Integer, String, BigInteger
from sqlalchemy import UniqueConstraint
from model.base import Base, IdGenerator
from model.session import get_session


class Menu(Base):
    __tablename__ = 'manage_menu'

    __table_args__ = (
        UniqueConstraint('code', name='code'),
    )

    @classmethod
    def get_count(cls):
        with get_session() as db_session:
            count = db_session.query(cls).count()
            if count:
                return count + 1
            else:
                return 0

    id = Column(BigInteger, default=IdGenerator.gen, primary_key=True)
    # 名称
    name = Column(String(50), nullable=False, index=True)
    # 代码
    code = Column(String(50), nullable=False, index=True)
    # 排序
    sort = Column(Integer, default=get_count, index=True)
    # 父级ID
    parent_id = Column(BigInteger, default=0, index=True)
    # 图标信息
    icon_info = Column(String(60))
    # url
    url = Column(String(50))

    def to_dict(self):
        return {
            'id': str(self.id),
            'name': self.name,
            'code': self.code,
            'sort': self.sort,
            'parent_id': str(self.parent_id),
            'icon_info': self.icon_info,
            'url': self.url
        }

