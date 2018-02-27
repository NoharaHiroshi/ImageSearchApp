# coding=utf-8

import os
from sqlalchemy import Column, Integer, String, BigInteger
from model.base import Base, IdGenerator


class ImageDownloadHistory(Base):
    __tablename__ = 'image_download_history'

    id = Column(BigInteger, default=IdGenerator.gen, primary_key=True)
    customer_id = Column(BigInteger, nullable=False, index=True)
    customer_name = Column(String(45), index=True)
    image_id = Column(BigInteger, nullable=False, index=True)

    def to_dict(self):
        return {
            'id': str(self.id),
            'customer_id': str(self.customer_id),
            'customer_name': self.customer_name,
            'image_id': str(self.image_id)
        }