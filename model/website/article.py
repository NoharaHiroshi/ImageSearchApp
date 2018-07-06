# coding=utf-8

from sqlalchemy import Column, Integer, String, BigInteger, TEXT
from sqlalchemy import UniqueConstraint
from model.base import Base, IdGenerator
from model.session import get_session
from model.image.image import Image


class Article(Base):
    __tablename__ = 'website_article'

    STATUS_DRAFT, STATUS_PUBLISH = range(2)

    id = Column(BigInteger, default=IdGenerator.gen, primary_key=True)
    # 标题
    title = Column(String(100), index=True, nullable=False)
    # 状态
    status = Column(Integer, index=True, default=STATUS_DRAFT)
    # 作者
    author = Column(BigInteger, index=True, nullable=False)
    # 阅读量
    view_count = Column(Integer, default=0, nullable=False, index=True)
    # 评论数
    comment_count = Column(Integer, default=0, index=True)
    # 版本号（用于版本管理及回溯）
    version = Column(Integer, default=0, index=True)
    # 点赞数
    agree_count = Column(Integer, default=0, index=True)
    # 否定数
    disagree_count = Column(Integer, default=0, index=True)
    # 正文内容
    content = Column(TEXT)
    # 摘要
    desc = Column(TEXT)

    def to_dict(self):
        return {
            'id': str(self.id),
            'title': self.title,
            'status': self.status,
            'author': self.author,
            'view_count': self.view_count,
            'comment_count': self.comment_count,
            'agree_count': self.agree_count,
            'disagree_count': self.disagree_count,
            'version': self.version,
            'desc': self.desc,
            'created_date': self.created_date.strftime('%Y-%m-%d %H:%M:%S'),
            'modified_date': self.modified_date.strftime('%Y-%m-%d %H:%M:%S'),
        }