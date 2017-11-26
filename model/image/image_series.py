# coding=utf-8

from sqlalchemy import Column, Integer, String, BigInteger
from model.base import Base, IdGenerator
from model.session import get_session
from model.image.image import Image


class ImageSeries(Base):
    __tablename__ = 'image_series'

    id = Column(BigInteger, default=IdGenerator.gen, primary_key=True)
    # 名称
    name = Column(String(100), index=True)
    # 作者
    author = Column(String(100), default=u'未知', index=True)
    # 描述
    desc = Column(String(255))
    # 封面图
    cover_image_id = Column(BigInteger)

    @property
    def cover_image_url(self):
        with get_session() as db_session:
            if self.cover_image_id:
                cover_image = db_session.query(Image).get(self.cover_image_id)
                if cover_image:
                    url = cover_image.img_full_url
                else:
                    url = ""
            else:
                url = ""
        return url

    @property
    def count(self):
        with get_session() as db_session:
            image_count = db_session.query(ImageSeriesRel).filter(
                ImageSeriesRel.image_series_id == self.id
            ).count()
            image_count = image_count if image_count else 0
        return image_count

    def to_dict(self):
        return {
            'id': str(self.id),
            'name': self.name,
            'author': self.author,
            'desc': self.desc,
            'cover_image_id': str(self.cover_image_id),
            'cover_image_url': self.cover_image_url,
            'count': self.count,
        }


class ImageSeriesRel(Base):
    __tablename__ = 'image_series_rel'

    id = Column(BigInteger, default=IdGenerator.gen, primary_key=True)
    # 图片ID
    image_id = Column(BigInteger, index=True)
    # 系列ID
    image_series_id = Column(BigInteger, index=True)
    # 系列名称
    image_series_name = Column(String(100), index=True)

    def to_dict(self):
        return {
            'id': str(self.id),
            'image_id': str(self.image_id),
            'image_series_id': str(self.image_series_id),
            'image_series_name': self.image_series_name
        }

if __name__ == '__main__':
    print IdGenerator.gen()