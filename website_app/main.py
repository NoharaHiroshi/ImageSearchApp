# coding=utf-8

from website_app import create_app
from website_app.config import config

app = create_app(config)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8899, threaded=True)