# coding=utf-8

from tasks import app


@app.task(name='tasks.test.add', ignore_result=True)
def add(x, y):
    return x + y

if __name__ == '__main__':
    result = add.delay(1, 3)
