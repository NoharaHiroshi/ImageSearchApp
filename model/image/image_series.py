# coding=utf-8

from sqlalchemy import Column, Integer, String, BigInteger
from model.base import Base, IdGenerator
from model.session import get_session
from model.image.image import Image


class ImageSeries(Base):
    __tablename__ = 'image_series'

    # 专题类型：普通专题、分类专题
    TYPE_COMMON, TYPE_CATEGORY = range(2)

    id = Column(BigInteger, default=IdGenerator.gen, primary_key=True)
    # 名称
    name = Column(String(100), index=True)
    # 类型
    type = Column(Integer, default=TYPE_COMMON, index=True)
    # 作者
    author = Column(String(100), default=u'未知', index=True)
    # 描述
    desc = Column(String(255))
    # 封面图
    cover_image_id = Column(BigInteger)

    @property
    def type_text(self):
        s = {
            self.TYPE_COMMON: u'普通专题',
            self.TYPE_CATEGORY: u'分类专题',
        }

        return s.get(self.type, u'未知专题类型')

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

    @classmethod
    def get_all_series(cls):
        all_series_list = list()
        with get_session() as db_session:
            all_series = db_session.query(cls).all()
            for series in all_series:
                series_dict = series.to_dict()
                all_series_list.append(series_dict)
        return all_series_list

    def to_dict(self):
        return {
            'id': str(self.id),
            'name': self.name,
            'type': self.type,
            'type_text': self.type_text,
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