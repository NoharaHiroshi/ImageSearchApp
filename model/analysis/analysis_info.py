# coding=utf-8

import time
from sqlalchemy import Column, Integer, String, BigInteger, DateTime
from model.base import Base, IdGenerator


class AnalysisCustomer(Base):
    __tablename__ = 'analysis_customer'

    id = Column(BigInteger, default=IdGenerator.gen, primary_key=True)
    stats_date = Column(DateTime, index=True)

