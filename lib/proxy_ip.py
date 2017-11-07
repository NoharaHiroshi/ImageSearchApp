# coding=utf-8

"""
    获取代理IP，验证代理IP的可用性
"""
import ujson
import requests

from redis_store.redis_cache import proxy_redis


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
    local_ip = '127.0.0.1'
    # 有效代理IP池
    proxy_pool = []
    # 超时时间
    timeout = 3
    for ip in proxy_ips:
        try:
            response = requests.get('http://localhost:8888/lib/validate_proxy_ip', proxies=ip, timeout=timeout)
        except Exception as e:
            continue
        print response.content
        result = ujson.loads(response.content)
        if result['ip'] != local_ip:
            proxy_pool.append(ip)
    return proxy_pool


if __name__ == '__main__':
    # 待清洗代理IP数据池
    proxies = [
        {"http": "116.27.244.156:21538"},
        {"http": "183.52.107.157:36808"},
        {"http": "140.237.112.172:48879"},
        {"https": "115.213.250.255:42980"},
    ]
