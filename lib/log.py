# coding=utf-8

import logging
import logging.handlers


def create_log(name):
    new_log = logging.getLogger(name)

    app_formatter = logging.Formatter("%(asctime)s\t%(process)d|%(thread)d\t%(module)s|%(funcName)s|%(lineno)d"
                                      "\t%(levelname)s\t%(message)s", "%Y-%m-%d@%H:%M:%S")
    console_handler = logging.StreamHandler()
    console_handler.setFormatter(app_formatter)
    console_handler.setLevel(logging.DEBUG)

    new_log.propagate = False
    new_log.addHandler(console_handler)
    new_log.setLevel(logging.DEBUG)

    return new_log
