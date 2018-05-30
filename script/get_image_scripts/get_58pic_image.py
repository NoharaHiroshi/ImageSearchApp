# encoding=utf-8

"""
    目的源： 'http://www.58pic.com'
"""

import requests
import time
import traceback
import lxml
import ujson
from bs4 import BeautifulSoup as bs
from model.script.script_58pic_image import PIC58Image
from model.session import get_session

# 获取关联关键字的url
get_connect_keywords_url = r'http://www.58pic.com/index.php?m=searchtips&a=searchRelated&kw=%s' % u'粽子'

# 搜索内容的url，方法post，参数word:list, noresult:string, 返回json数据
result_url = r'http://www.58pic.com/index.php?m=result&a=search'


# 重写GET请求方法
def get_requests(url, headers=None, timeout=10, times=1, retry=5):
    try:
        response = requests.get(url, headers=headers, timeout=timeout)
        if response and response.status_code == 200:
            return response
        else:
            print u'------------ 重试次数： %s -------------' % times
            time.sleep(5)
            times += 1
            if times <= retry:
                get_requests(url, headers, times=times)
            else:
                return None
    except Exception as e:
        print traceback.format_exc(e)
        print u'------------ 重试次数： %s -------------' % times
        time.sleep(5)
        times += 1
        if times <= retry:
            get_requests(url, headers, times=times)
        else:
            return None


# 重写POST请求方法
def post_requests(url, data, headers=None, timeout=10, times=1, retry=5):
    try:
        response = requests.post(url, data=data, headers=headers, timeout=timeout)
        if response and response.status_code == 200:
            return response
        else:
            print u'------------ 重试次数： %s -------------' % times
            time.sleep(5)
            times += 1
            if times <= retry:
                get_requests(url, headers, times=times)
            else:
                return None
    except Exception as e:
        print traceback.format_exc(e)
        print u'------------ 重试次数： %s -------------' % times
        time.sleep(5)
        times += 1
        if times <= retry:
            get_requests(url, headers, times=times)
        else:
            return None


def get_png_image_from_keyword(keyword):
    """
    :param keyword: 要搜索的关键词
    :return: json格式的数据
    """
    url = result_url
    result = {
        'response': 'ok',
        'code': 0,
        'info': ''
    }
    data = {
        'word': keyword,
        'noresult': ''
    }
    response = post_requests(url, data)
    if response:
        r = ujson.loads(response.content)
        status = r.get(u'status')
        # 获取成功
        if status == 1:
            data_list = r.get(u'data', [])
            if data_list:
                with get_session() as db_session:
                    for data in data_list:
                        pic_width = data.get(u'picwidth', u'')
                        pic_height = data.get(u'picheight', u'')
                        pic_title = data.get(u'title', u'')
                        pic_url = data.get(u'picurl', u'')
                        pic_id = data.get(u'id', u'')
                        pic_image = db_session.query(PIC58Image).filter(
                            PIC58Image.pic_id == pic_id
                        ).first()
                        if not pic_image:
                            pic_image = PIC58Image()
                            pic_image.key_word = keyword
                            pic_image.pic_height = pic_height
                            pic_image.pic_width = pic_width
                            pic_image.pic_name = pic_title
                            pic_image.pic_url = pic_url
                            pic_image.pic_id = pic_id
                            db_session.add(pic_image)
                    db_session.commit()
            else:
                result.update({
                    'response': 'fail',
                    'code': 2,
                    'info': u'获取图片信息失败'
                })
                return ujson.dumps(result)
        else:
            result.update({
                'response': 'fail',
                'code': 1,
                'info': u'获取信息失败'
            })
            return ujson.dumps(result)
if __name__ == '__main__':
    get_png_image_from_keyword(u'粽子')
