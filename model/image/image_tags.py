# coding=utf-8

from sqlalchemy import Column, Integer, String, BigInteger
from model.base import Base, IdGenerator
from model.session import get_session


# 该模型主要用于存储图片标签
class ImageTags(Base):
    __tablename__ = 'image_tags'

    id = Column(BigInteger, default=IdGenerator.gen, primary_key=True)
    name = Column(String(30), nullable=False, index=True)
    view_count = Column(Integer, default=0, index=True)

    @property
    def count(self):
        with get_session() as db_session:
            image_count = db_session.query(ImageTagsRel).filter(
                ImageTagsRel.tag_id == self.id
            ).count()
            image_count = image_count if image_count else 0
        return image_count

    def to_dict(self):
        return {
            'id': str(self.id),
            'name': self.name,
            'count': self.count,
            'view_count': self.view_count,
            'created_date': self.created_date.strftime('%Y-%m-%d %H:%M:%S'),
            'modified_date': self.modified_date.strftime('%Y-%m-%d %H:%M:%S'),
        }


class ImageTagsRel(Base):
    __tablename__ = 'image_tags_rel'

    # 图片、图片系列
    TYPE_IMAGE, TYPE_IMAGE_SERIES = range(2)

    id = Column(BigInteger, default=IdGenerator.gen, primary_key=True)
    # 类型
    type = Column(Integer, default=TYPE_IMAGE, index=True)
    # 标签ID
    tag_id = Column(BigInteger, nullable=False, index=True)
    # 标签名称
    tag_name = Column(String(100), nullable=False, index=True)
    # 图片ID/图片系列ID
    image_id = Column(BigInteger, nullable=False, index=True)

    def to_dict(self):
        return {
            'id': str(self.id),
            'type': self.type,
            'tag_id': str(self.tag_id),
            'tag_name': self.tag_name,
            'image_id': str(self.image_id),
            'created_date': self.created_date.strftime('%Y-%m-%d %H:%M:%S'),
            'modified_date': self.modified_date.strftime('%Y-%m-%d %H:%M:%S'),
        }


# 改模型主要用于扩展用户搜索标签的入口，比如用户搜索树叶素材，可以通树叶、叶子等入口搜索同一素材
class ImageAssociationTag(Base):
    __tablename__ = 'image_association_tag'

    id = Column(BigInteger, default=IdGenerator.gen, primary_key=True)
    # 标签名称
    name = Column(String(100), index=True, nullable=False)
    # 主标签ID
    tag_id = Column(BigInteger, nullable=False, index=True)

    def to_dict(self):
        return {
            'id': str(self.id),
            'name': self.name,
            'tag_id': str(self.tag_id),
            'created_date': self.created_date.strftime('%Y-%m-%d %H:%M:%S'),
            'modified_date': self.modified_date.strftime('%Y-%m-%d %H:%M:%S'),
        }


# 图片标签分组，主要用于推荐相似标签
class ImageRecommendTags(Base):
    __tablename__ = 'image_recommend_tags'

    id = Column(BigInteger, default=IdGenerator.gen, primary_key=True)
    # 标签分组名
    name = Column(String(45), nullable=False, index=True)

    def to_dict(self):
        return {
            'id': str(self.id),
            'name': self.name
        }


# 标签分组与标签之间的关系表
class ImageRecommendTagsRel(Base):
    __tablename__ = 'image_recommend_tags_rel'

    id = Column(BigInteger, default=IdGenerator.gen, primary_key=True)
    # 标签组ID
    recommend_tag_id = Column(BigInteger, index=True, nullable=False)
    # 标签ID
    tag_id = Column(BigInteger, index=True, nullable=False)


if __name__ == '__main__':
    print IdGenerator.gen()