# coding=utf-8

from model.base import Base
from model.session import engine
from model.manage.user import User


def create_all_tables():
    Base.metadata.create_all(engine)

if __name__ == '__main__':
    create_all_tables()