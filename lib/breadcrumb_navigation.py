# encoding=utf-8

from model.session import get_session
from model.image.image import Image
from model.image.image_tags import ImageTags
from model.image.image_series import ImageSeries, ImageSeriesCategory, ImageSeriesRel, ImageSeriesCategoryRel


# 根据分析url获取面包屑导航
def breadcrumb_navigation(url):
    url = ''.join(['#', url])
    nav_list = list()
    # 链接名称、类型、链接参数
    # 0：首页， 1：图片系列页， 2：图片系列分类页
    nav_list.append([u'首页', 0, r'/'])
    url_list = url.split('#/')
    url_info = url_list[1]
    url_info_list = url_info.split('/')
    url_type = url_info_list[0]
    url_id = url_info_list[1]
    with get_session() as db_session:
        if url_type == 'image_detail':
            image_series = db_session.query(ImageSeries).join(
                ImageSeriesRel, ImageSeriesRel.image_series_id == ImageSeries.id
            ).filter(
                ImageSeriesRel.image_id == url_id
            ).first()
            if image_series:
                image_series_category = db_session.query(ImageSeriesCategory).join(
                    ImageSeriesCategoryRel, ImageSeriesCategoryRel.category_id == ImageSeriesCategory.id
                ).filter(
                    ImageSeriesCategoryRel.series_id == image_series.id
                ).first()
                if image_series_category:
                    nav_list.append([image_series_category.name, 2, str(image_series_category.id)])
                nav_list.append([image_series.name, 1, str(image_series.id)])
        elif url_type == 'image_list':
            image_series = db_session.query(ImageSeries).get(url_id)
            if image_series:
                image_series_category = db_session.query(ImageSeriesCategory).join(
                    ImageSeriesCategoryRel, ImageSeriesCategoryRel.category_id == ImageSeriesCategory.id
                ).filter(
                    ImageSeriesCategoryRel.series_id == image_series.id
                ).first()
                if image_series_category:
                    nav_list.append([image_series_category.name, 2, str(image_series_category.id)])
                nav_list.append([image_series.name, 1, str(image_series.id)])
        elif url_type == 'image_series_list':
            image_series_category = db_session.query(ImageSeriesCategory).get(url_id)
            if image_series_category:
                nav_list.append([image_series_category.name, 2, str(image_series_category.id)])
    return nav_list

if __name__ == '__main__':
    pass
