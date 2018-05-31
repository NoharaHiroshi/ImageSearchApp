# coding=utf-8

from sqlalchemy import Column, Integer, String, BigInteger
from model.base import Base, IdGenerator

from model.session import get_session


class PIC58Image(Base):
    __tablename__ = 'script_58pic_image'

    # 状态：待获取、已获取
    STATUS_DEFAULT, STATUS_USED = range(2)

    id = Column(BigInteger, default=IdGenerator.gen, primary_key=True)
    # 图片标题
    pic_name = Column(String(100), index=True)
    # 搜索关键词
    key_word = Column(String(50), index=True)
    # 图片url
    pic_url = Column(String(225))
    # 图片id
    pic_id = Column(String(10), index=True)
    # 状态
    status = Column(Integer, default=STATUS_DEFAULT, index=True)

    def to_dict(self):
        return {
            'id': str(self.id),
            'pic_name': self.pic_name,
            'key_word': self.key_word,
            'pic_url': self.pic_url,
            'pic_id': self.pic_id,
            'status': self.status,
            'created_date': self.created_date.strftime('%Y-%m-%d %H:%M:%S'),
            'modified_date': self.modified_date.strftime('%Y-%m-%d %H:%M:%S'),
        }