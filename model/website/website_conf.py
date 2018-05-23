# coding=utf-8

from sqlalchemy import Column, Integer, String, BigInteger
from sqlalchemy import UniqueConstraint
from model.base import Base, IdGenerator
from model.session import get_session


class WebsiteConf(Base):
    __tablename__ = 'website_conf'

    id = Column(BigInteger, default=IdGenerator.gen, primary_key=True)
    # 静态资源位置URL
    resource_url = Column(String(225))
    # 网站网址
    website_url = Column(String(225))
    # 免费下载次数
    free_download_count = Column(Integer, nullable=False, index=True, default=5)
    # 免费下载次数时间间隔（单位秒）
    free_download_time = Column(BigInteger, nullable=False, index=True, default=3600)

    def to_dict(self):
        return {
            'id': str(self.id),
            'website_url': self.website_url,
            'resource_url': self.resource_url,
            'free_download_count': self.free_download_count,
            'free_download_time': self.free_download_time
        }