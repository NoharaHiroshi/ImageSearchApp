# coding:utf-8

from flask import render_template, abort, g, redirect, url_for, request, jsonify, session
from redis_store.redis_cache import proxy_redis

from route import lib


@lib.route('/validate_proxy_ip', methods=['GET'])
def validate_proxy_ip():
    result = {
        'response': 'ok',
        'ip': '',
    }
    ip = request.remote_addr
    result['ip'] = ip
    return jsonify(result)


@lib.route('/all_proxy_ip', methods=['GET'])
def get_all_proxy_ip():
    result = {
        'response': 'ok',
        'http_ip_list': [],
        'https_ip_list': []
    }
    try:
        http_ip_list = proxy_redis.hkeys('http_proxies')
        https_ip_list = proxy_redis.hkeys('https_proxies')
        result.update({
            'http_ip_list': http_ip_list,
            'https_ip_list': https_ip_list
        })
        return jsonify(result)
    except Exception as e:
        print e
        abort(400)