# -*- coding=utf-8 -*-

u"""
分页相关函数
"""


class SQLAlchemyPaginator:
    def __init__(self, query, per_page):
        self.query = query
        self.per_page = int(per_page)
        self.count = query.count()

    @property
    def max_page(self):
        return int((self.count / self.per_page) + 1)

    def get_validate_page(self, page):
        # 验证页码是否合法
        if isinstance(page, (str, unicode, int)):
            page = int(page)
            if page > 0:
                if page <= self.max_page:
                    return page
                else:
                    return self.max_page
            else:
                return 1
        else:
            return 1

    def page(self, number):
        # 获取当前页内容
        number = self.get_validate_page(number)
        limit = self.per_page
        offset = (number - 1) * self.per_page
        return self.query.offset(offset).limit(limit).all()

if __name__ == '__main__':
    pass


