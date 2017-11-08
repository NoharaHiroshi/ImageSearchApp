# coding=utf-8

"""
    获取代理IP，验证代理IP的可用性
"""

import ujson
import requests

from bs4 import BeautifulSoup as bs
from redis_store.redis_cache import proxy_redis


def get_proxy(page_num=1):
    timeout = 3
    headers = {
            'Host': 'www.xicidaili.com',
            'Connection': 'keep-alive',
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'X-Requested-With': 'XMLHttpRequest',
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 '
                          '(KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36',
            'Referer': 'http://www.xicidaili.com/wn/',
            'Accept-Encoding': 'gzip, deflate, sdch',
            'Accept-Language': 'zh-CN,zh;q=0.8',
        }
    cleaned_data = list()
    for page in range(1, page_num):
        url = r'http://www.xicidaili.com/nn/%s' % page
        response = requests.get(url, headers=headers, timeout=timeout)
        content = response.content
        soup = bs(content, 'lxml')
        new_data = list()
        for node in soup.find_all('td'):
            new_data.append(node.string)
        for i in range(0, len(new_data), 10):
            ip = {
                new_data[i+5].lower(): '%s:%s' % (new_data[i+1], new_data[i+2])
            }
            cleaned_data.append(ip)
    return cleaned_data


def restore_redis_proxy(proxies):
    for index, proxy in enumerate(proxies):
        for _type, ip in proxy.items():
            if _type == 'http':
                proxy_redis.hset('http_proxies', ip, False)
            elif _type == 'https':
                proxy_redis.hset('https_proxies', ip, False)


def validate_proxy_ip(proxy_ips):
    """
    :param proxy_ips: [
        {"http": "115.231.105.109:8081"},
        {"https": "218.29.111.106:9999"},
    ]
    :return: [
        {"http": "115.231.105.109:8081"},
        {"https": "218.29.111.106:9999"},
    ]
    """
    # 本机IP
    local_ip = '103.233.130.246'
    # 有效代理IP池
    proxy_pool = []
    # 超时时间
    timeout = 10
    headers = {
        'Connection': 'keep-alive',
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'X-Requested-With': 'XMLHttpRequest',
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 '
                      '(KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36',
        'Accept-Encoding': 'gzip, deflate, sdch',
        'Accept-Language': 'zh-CN,zh;q=0.8',
    }
    for ip in proxy_ips:
        try:
            response = requests.get('http://ip.chinaz.com/getip.aspx', headers=headers, proxies=ip, timeout=timeout)
            result = ujson.loads(response.content)
        except Exception as e:
            continue
        if result['ip'] != local_ip:
            proxy_pool.append(ip)
    return proxy_pool


if __name__ == '__main__':
    # 待清洗代理IP数据池
    # proxies = get_proxy(page_num=10)
    # cleaned_proxy = validate_proxy_ip(proxies)
    # restore_redis_proxy(cleaned_proxy)
    # for proxy in proxies:
    #     for ip in proxy.values():
    #         print ip
    # validate_proxy_ip([{'https':'111.155.116.200:8123'}])
    print ujson.dumps({'https': '111.155.116.200:8123'})