# encoding=utf-8

"""
    目的源： 'http://3png.com'
"""

import requests
import time
import traceback
import lxml
import json
import os
import random
from model.script.script_3png_image import PIC3Image
from model.session import get_session
from urllib import quote
from bs4 import BeautifulSoup as bs

query_keyword_url = r'http://3png.com/list.html'


# 重写GET请求方法
def get_requests(url, data=None, headers=None, timeout=10, times=1, retry=3):
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
def post_requests(url, data, headers=None, timeout=10, times=1, retry=3):
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


def get_keyword(keyword):
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
        list_url = 'http://3png.com/list.html'
        url = query_keyword_url
        url = '%s?k=%s' % (url, quote(keyword))
        response = get_requests(url, headers=headers)
        url = response.url
        key_value = url.split('/')[-1].split('.')[0].split('-')[-1]
        new_keyword_url = '%s?k=%s' % (list_url, key_value)
        soup = bs(response.text, 'lxml')
        page_list = soup.select('.page > ul > a > li')
        max_page = int(page_list[-2].get_text())
        return new_keyword_url, max_page
    except Exception as e:
        print traceback.format_exc(e)


def query_keyword(keyword, url=None, page=1, max_page=None):
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
        if not url or max_page:
            url, max_page = get_keyword(keyword)
        page_url = '%s&p=%s' % (url, str(page))
        print u'------------ 当前获取%s页， 共%s页 ---------------' % (page, max_page)
        base_url = 'http://3png.com'
        response = get_requests(page_url, headers=headers)
        soup = bs(response.text, 'lxml')
        img_show_list = soup.select('.img-show > a')
        title_list = soup.select('.pic-title > h4')
        if img_show_list:
            with get_session() as db_session:
                for i, img_show in enumerate(img_show_list):
                    img_show_href = img_show['href']
                    img_show_full_href = '%s%s' % (base_url, img_show_href)
                    title = title_list[i].get_text()
                    img_id = img_show_full_href.split('/')[-1].split('.')[0].split('-')[-1]
                    has_img = db_session.query(PIC3Image).filter(
                        PIC3Image.pic_id == img_id
                    ).first()
                    if not has_img:
                        img = PIC3Image()
                        img.pic_name = title
                        img.key_word = keyword
                        img.pic_id = img_id
                        db_session.add(img)
                db_session.commit()
                if page < max_page:
                    time.sleep(5)
                    page += 1
                    query_keyword(keyword, url, page, max_page)
    except Exception as e:
        print traceback.format_exc(e)


def download_image(keyword, error_count=5):
    download_url = 'http://3png.com/beha-down'
    headers = {
        'Accept': '*/*',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'zh-CN, zh; q=0.9',
        'Connection': 'keep-alive',
        'Content-Length': '11',
        'Cookie': 'UM_distinctid=1639018ae2914a-03bd3da834d279-3e3d5307-1aeaa0-1639018ae2aa4c; '
                  'PHPSESSID=ni5ael6fobl8osg14pa2eckbl6; '
                  'Hm_lvt_7c98f23e75ca58af5a589dcae3391616=1532510012; '
                  'CNZZDATA1261035286=1685858532-1527130688-%7C1532574174; '
                  'Hm_lpvt_7c98f23e75ca58af5a589dcae3391616=1532576573',
        'Host': '3png.com',
        'Origin': 'http://3png.com',
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 '
                      '(KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36',
        'X-Requested-With': 'XMLHttpRequest'
    }
    data = {
        'id': 0
    }
    with get_session() as db_session:
        all_image = db_session.query(PIC3Image).filter(
            PIC3Image.key_word == keyword,
            PIC3Image.status == PIC3Image.STATUS_DEFAULT
        ).all()
        all_image_count = len(all_image)
        count = 1
        base_url = os.path.dirname(__file__)
        file_url = os.path.join(base_url, 'another_object')
        file_path = os.path.join(file_url, keyword).replace('\\', '/')
        if not os.path.exists(file_path):
            os.makedirs(file_path)
        code_count = 0
        for image in all_image:
            time.sleep(random.randint(3, 10))
            img_title = image.pic_name
            img_title = '.'.join([img_title, 'png'])
            img_name = os.path.join(file_path, img_title).replace('\\', '/')
            print u'----------------- 正在获取%s 剩余%s----------------' % (img_title, all_image_count - count)
            if os.path.exists(img_name):
                img_title = image.pic_name + str(int(time.time()))
                img_title = '.'.join([img_title, 'png'])
                img_name = os.path.join(file_path, img_title).replace('\\', '/')
            pic_id = image.pic_id
            data.update({
                'id': pic_id
            })
            img_response = post_requests(download_url, data=data, timeout=50, headers=headers)
            response_result = json.loads(img_response.content)
            print img_response.content
            code = response_result.get('code', 0)
            if int(code) == 1:
                # 状态成功， 计数清零
                code_count = 0
                download_image_url = response_result.get('url', None)
                if download_image_url:
                    download_response = get_requests(url=download_image_url)
                    with open(img_name, 'wb') as f:
                        f.write(download_response.content)
                    image.status = PIC3Image.STATUS_USED
                    count += 1
                    db_session.commit()
            elif int(code) == -2:
                code_count += 1
                print u'当前code非正常次数%s' % code_count
                if code_count > error_count:
                    print u'达到最大重试次数，冷却600s后重试'
                    time.sleep(600)
                    code_count = 0

if __name__ == '__main__':
    download_image(u'花')