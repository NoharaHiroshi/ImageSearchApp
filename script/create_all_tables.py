# coding=utf-8

from model.base import Base
from model.session import engine
from model.manage.user import User
from model.manage.menu import Menu
from model.manage.func import Func, MenuFunc
from model.manage.role import Role, UserRole
from model.manage.permission import RolePermissionRel
from model.icon.icon import Icon
from model.icon.icon_series import IconSeries
from model.icon.icon_tags import IconTags, IconTagsRel
from model.image.image import Image
from model.image.image_series import ImageSeries, ImageSeriesRel
from model.image.image_tags import ImageTags, ImageTagsRel

from model.website.menu import WebsiteMenu
from model.website.hot_search import WebsiteHotSearch
from model.website.banner import Banner
from model.website.column import WebsiteColumnSeriesRel, WebsiteColumn


def create_all_tables():
    Base.metadata.create_all(engine)

if __name__ == '__main__':
    create_all_tables()