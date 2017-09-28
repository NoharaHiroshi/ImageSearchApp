# coding=utf-8

from model.base import Base
from model.session import engine
from model.manage.user import User
from model.manage.menu import Menu
from model.manage.func import Func, MenuFunc
from model.manage.role import Role, UserRole
from model.manage.permission import RolePermissionRel


def create_all_tables():
    Base.metadata.create_all(engine)

if __name__ == '__main__':
    create_all_tables()