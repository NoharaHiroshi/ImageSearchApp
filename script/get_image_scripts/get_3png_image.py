# encoding=utf-8

"""
    目的源： 'http://3png.com'
"""

import requests
import time
import traceback
import lxml
from urllib import quote
from bs4 import BeautifulSoup as bs

query_keyword_url = r'http://3png.com/list.html?k='


# 重写GET请求方法
def get_requests(url, data=None, headers=None, timeout=10, times=1, retry=5):
    try:
        response = requests.get(url, data=data, headers=headers, timeout=timeout)
        if response and response.status_code == 200:
            return response
        else:
            print u'------------ 重试次数： %s -------------' % times
            times += 1
            if times <= retry:
                get_requests(url, data, headers, times=times)
            else:
                return None
    except Exception as e:
        print traceback.format_exc(e)
        print u'------------ 重试次数： %s -------------' % times
        times += 1
        if times <= retry:
            get_requests(url, data, headers, times=times)
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
            times += 1
            if times <= retry:
                get_requests(url, headers, times=times)
            else:
                return None
    except Exception as e:
        print traceback.format_exc(e)
        print u'------------ 重试次数： %s -------------' % times
        times += 1
        if times <= retry:
            get_requests(url, headers, times=times)
        else:
            return None


def query_keyword(keyword):
    headers = {
        'Accept': 'text/html, application/xhtml+xml, application/xml; q=0.9, image/webp, image/apng, */*; q = 0.8',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'zh-CN, zh; q = 0.9',
        'Connection': 'keep-alive',
        'Cookie': 'UM_distinctid=1639018ae2914a-03bd3da834d279-3e3d5307-1aeaa0-1639018ae2aa4c; '
                  'PHPSESSID=ni5ael6fobl8osg14pa2eckbl6; '
                  'CNZZDATA1261035286=1685858532-1527130688-%7C1532508648; '
                  'Hm_lvt_7c98f23e75ca58af5a589dcae3391616=1532510012; '
                  'Hm_lpvt_7c98f23e75ca58af5a589dcae3391616=1532510130',
        'Host': '3png.com',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 '
                      '(KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36'
    }
    try:
        url = query_keyword_url
        base_url = 'http://3png.com'
        result = {
            'response': 'ok',
            'code': 0,
            'info': ''
        }
        url = '%s%s' % (url, quote(keyword))
        response = get_requests(url, headers=headers)
        soup = bs(response.text, 'lxml')
        img_show_list = soup.select('.img-show > a')
        title_list = soup.select('.pic-title > h4')
        if img_show_list:
            for i, img_show in enumerate(img_show_list):
                img_show_href = img_show['href']
                img_show_full_href = '%s%s' % (base_url, img_show_href)
                title = title_list[i].get_text()
                img_id = img_show_full_href.split('/')[-1].split('.')[0].split('-')[-1]

    except Exception as e:
        print traceback.format_exc(e)

if __name__ == '__main__':
    query_keyword('花')