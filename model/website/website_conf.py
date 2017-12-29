# coding=utf-8

from sqlalchemy import Column, Integer, String, BigInteger
from sqlalchemy import UniqueConstraint
from model.base import Base, IdGenerator
from model.session import get_session


class WebsiteConf(Base):
    __tablename__ = 'website_conf'

    id = Column(BigInteger, default=IdGenerator.gen, primary_key=True)