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
            'content': self.content,
            'created_date': self.created_date.strftime('%Y-%m-%d %H:%M:%S'),
            'modified_date': self.modified_date.strftime('%Y-%m-%d %H:%M:%S'),
        }


class ArticleComment(Base):
    __tablename__ = 'website_article_comment'

    # 评论文章，评论用户评论， 层中评论
    TYPE_ARTICLE, TYPE_COMMENT, TYPE_REPLY = range(3)

    id = Column(BigInteger, default=IdGenerator.gen, primary_key=True)
    # 评论会员
    customer_id = Column(BigInteger, index=True, nullable=False)
    # 评论员名称
    customer_name = Column(String(100), index=True, nullable=False)
    # 评论内容
    content = Column(TEXT)
    # 评论ID
    comment_id = Column(BigInteger, index=True, nullable=False)
    # 类型
    type = Column(Integer, default=TYPE_ARTICLE, index=True)

    # 上级回复
    @property
    def last_reply(self):
        with get_session() as db_session:
            reply = db_session.query(ArticleComment).filter(
                ArticleComment.id == self.comment_id
            ).first()
        return reply

    # 楼中回复
    def floor_reply_list(self, f_r_l=list()):
        with get_session() as db_session:
            all_floor_reply = db_session.query(ArticleComment).filter(
                ArticleComment.comment_id == self.id,
                ArticleComment.type == ArticleComment.TYPE_REPLY
            ).all()
            if all_floor_reply:
                for floor_reply in all_floor_reply:
                    floor_reply_dict = floor_reply.to_dict()
                    floor_reply_dict['last_reply'] = floor_reply.last_reply.to_dict() if floor_reply.last_reply else None
                    f_r_l.append(floor_reply_dict)
                    floor_reply.floor_reply_list(f_r_l)
        return f_r_l

    def to_dict(self):
        return {
            'id': str(self.id),
            'customer_id': str(self.customer_id),
            'customer_name': self.customer_name,
            'content': self.content,
            'comment_id': str(self.comment_id),
            'type': self.type,
            'created_date': self.created_date.strftime('%Y-%m-%d %H:%M:%S'),
            'modified_date': self.modified_date.strftime('%Y-%m-%d %H:%M:%S'),
        }