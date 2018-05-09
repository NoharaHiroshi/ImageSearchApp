# encoding=utf-8

from model.session import get_session
from model.image.image import Image
from model.image.image_tags import ImageTags
from model.image.image_series import ImageSeries, ImageSeriesCategory

url = 'http://127.0.0.1:8899/#/image_detail/6514536773161320451'


# 根据分析url获取面包屑导航
def breadcrumb_navigation(url):
    url_list = url.split('/#/')
    url_info = url_list[1]
    url_info_list = url_info.split('/')
    url_type = url_info_list[0]
    url_id = url_info_list[1]
    with get_session() as db_session:
        if url_type == 'image_detail':
            image_list = db_session.query()
        elif url_type == 'image_list':
            pass
        elif url_type == 'image_series_list':
            pass

if __name__ == '__main__':
    breadcrumb_navigation(url)
