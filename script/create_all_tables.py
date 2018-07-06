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
from model.image.image_series import ImageSeries, ImageSeriesRel, ImageSeriesCategory, ImageSeriesCategoryRel
from model.image.image_tags import ImageTags, ImageTagsRel, ImageRecommendTags, ImageRecommendTagsRel, ImageAssociationTag
from model.image.image_download_history import ImageDownloadHistory

from model.website.menu import WebsiteMenu
from model.website.hot_search import WebsiteHotSearch
from model.website.banner import Banner
from model.website.column import WebsiteColumnSeriesRel, WebsiteColumn
from model.website.customer import Customer, CustomerCollect
from model.website.discount import Discount, CustomerDiscount
from model.website.discount_code import DiscountCode, DisocuntCodeGenHistory
from model.website.website_conf import WebsiteConf
from model.website.article import Article

from model.script.script_58pic_image import PIC58Image, PIC58Background


def create_all_tables():
    Base.metadata.create_all(engine)

if __name__ == '__main__':
    create_all_tables()