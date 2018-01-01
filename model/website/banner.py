# coding=utf-8

from sqlalchemy import Column, Integer, String, BigInteger
from sqlalchemy import UniqueConstraint
from model.base import Base, IdGenerator
from model.session import get_session


class Banner(Base):
    __tablename__ = 'website_banner'

    # 类型（按照链接的页面分类）：二级首页、详情页
    TYPE_SECOND_INDEX, TYPE_DEFAULT_PAGE = range(2)

    id = Column(BigInteger, default=IdGenerator.gen, primary_key=True)
    # 名称
    name = Column(String(20), index=True)
    # 图片url
    url = Column(String(255), nullable=False)
    # 类型
    type = Column(Integer, default=TYPE_SECOND_INDEX, index=True)
    # 关联对象
    connect_id = Column(BigInteger, nullable=False, index=True)
    # 格式
    format = Column(String(10), nullable=False, default=u'UNKNOWN')
    # 宽
    width = Column(Integer)
    # 高
    height = Column(Integer)
    # 模式
    mode = Column(String(10))

    @property
    def img_full_url(self):
        img_url = 'resource/img/banner/%s.%s' % (self.url, self.format.lower())
        return img_url

    def to_dict(self):
        return {
            'id': str(self.id),
            'name': self.name,
            'format': self.format,
            'type': self.type,
            'connect_id': str(self.connect_id),
            'url': self.url,
            'width': self.width,
            'height': self.height,
            'mode': self.mode,
            'img_full_url': self.img_full_url
        }