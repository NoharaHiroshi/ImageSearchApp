# coding=utf-8

import time
from tasks import app
from model.session import get_session
from model.image.image import Image


@app.task(name='tasks.downloading_task.get_image_full_url', ignore_result=True)
def get_image_full_url(image_id):
    image_full_url = ''
    with get_session() as db_session:
        image = db_session.query(Image).get(image_id)
        if image:
            image_full_url = image.img_full_url
    return image_full_url


if __name__ == '__main__':
    result = get_image_full_url.delay(6491868640154746880)