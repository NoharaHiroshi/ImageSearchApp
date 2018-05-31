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
get_connect_keywords_url = r'http://www.58pic.com/index.php?m=searchtips&a=searchRelated&kw='

# 搜索内容的url，方法post，参数word:list, noresult:string, 返回json数据
result_url = r'http://www.58pic.com/index.php?m=result&a=search'

# 中文转化拼音url
change_pinyin_url = r'http://www.58pic.com/index.php?m=ajaxSearch&a=ajaxCheckPinyin&kw='

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
                        print data
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
                            pic_image.key_word = ','.join(keyword)
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


def get_pic_image(keyword):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 '
                      '(KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36',
        'Host': 'www.58pic.com',
        'Cookie': 'message2=1; qt_visitor_id=%229038ec9d87070adab957c76c48909535%22; '
                  'qt_ur_type=2; qt_createtime=1505923200; qt_type=2; '
                  'qt_addtime=%222017-09-21%22; message2=1; '
                  'qt_risk_visitor_id=%2235eb5141f45d662c1b14ae2e9ddd3499%22; '
                  'awake=0; FIRSTVISITED=1527666893.22; ISREQUEST=1; '
                  'imgCodeKey=%229b3a2031b62868dfedfccbc201b721a6%22; '
                  'history_search=%22%7B%5C%22%25F4%25D5%25D7%25D3_%5C%22%3A%5C%22%5C%5C%5C%2Ftupian%5C%5C%5C%2Fzi.html%5C%22%2C%5C%22%25B0%25FC%25D7%25D3_%5C%22%3A%5C%22%5C%5C%5C%2Ftupian%5C%5C%5C%2Fbaozi.html%5C%22%2C%5C%22PNG%25C3%25E2%25BF%25D9%25CB%25D8%25B2%25C4_%5C%22%3A%5C%22%5C%5C%5C%2Ftupian%5C%5C%5C%2F33051222.html%5C%22%7D%22; historyKw=%22s%253A4%253A%2522%25F4%25D5%25D7%25D3%2522%253B%22; user-browser=%22baidu%22; Hm_lvt_644763986e48f2374d9118a9ae189e14=1527132950,1527666894,1527667035,1527738112; qt_updatetime=%222018-05-31%22; user:search:worlds:new_0_1=%22a%253A1%253A%257Bi%253A0%253Bs%253A4%253A%2522%25F4%25D5%25D7%25D3%2522%253B%257D%22; referer=%22http%3A%5C%2F%5C%2Fwww.58pic.com%5C%2Ftupian%5C%2Fzi.html%22; qt_utime=1527745630; qt_uid=%2212213845%22; Hm_lpvt_644763986e48f2374d9118a9ae189e14=1527745633'
    }
    pinyin_url = change_pinyin_url + keyword
    pinyin_response = get_requests(pinyin_url, headers=headers, timeout=20)
    response = get_requests(url, headers=headers, timeout=20)
    response.encoding = 'gbk'
    if response:
        soup = bs(response.text, 'lxml')
        img_resource_list = soup.select('.flow-item')
        if img_resource_list:
            for img_resource in img_resource_list:
                img_id_info = img_resource.select('.card-img > a')[0]
                img_info = img_resource.select('.card-img > a > img')[0]
                if img_info and img_id_info:
                    img_id = img_id_info['data-id']
                    img_title = img_info['alt']
                    img_url = img_info['data-original'] if 'data-original' in img_info.attrs else img_info['src']
                    print img_id, img_title, img_url
                else:
                    continue

if __name__ == '__main__':
    # url = r'http://www.58pic.com/tupian/zi-0-0-default-7-0-%E7%B2%BD%E5%AD%90-0_2_0_0_0_0_0-.html'
    # get_pic_image(url)
    url = get_connect_keywords_url + u'粽子'
    response = get_requests(url)
    print response.text
