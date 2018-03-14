# coding=utf-8

from manage_app import create_app
from manage_app.config import config

app = create_app(config)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8888, threaded=True)