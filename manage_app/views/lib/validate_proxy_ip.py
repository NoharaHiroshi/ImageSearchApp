# coding:utf-8

from flask import render_template, abort, g, redirect, url_for, request, jsonify, session

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