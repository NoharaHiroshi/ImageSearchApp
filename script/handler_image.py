# encoding=utf-8

"""
    处理图片背景
"""

import os
import re
import traceback
import contextlib
import ImageFilter
import ImageEnhance
from PIL import Image


class NewImage:
    def __init__(self, file_name):
        self.base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        self.img_file_dir = os.path.join(self.base_dir, u'script\images')
        self.file_dir = os.path.join(self.img_file_dir, file_name)
        self.im = Image.open(self.file_dir)


@contextlib.contextmanager
def open_image(file_name):
    new_im = NewImage(file_name)
    try:
        yield new_im
    except Exception as e:
        print e
    finally:
        pass


def get_area_image(img_name, alw):
    try:
        with open_image(img_name) as image:
            new_img = image.im
            width, height = new_img.size
            r, g, b = new_img.split()
            alpha = b
            main_alpha = alpha.getdata()
            main_color = main_alpha[0]
            # 扫描主区域
            for h in range(height):
                row_info = list()
                row_info.append(0)
                # 是否进入素材
                is_area = False
                for w in range(width):
                    pixel = alpha.getpixel((w, h))
                    # 进入素材
                    if pixel < main_color - alw:
                        if not is_area:
                            row_info.append(w)
                            is_area = True
                    # 离开素材
                    if is_area:
                        if pixel >= main_color - alw:
                            row_info.append(w)
                            is_area = False
                row_info.append(width)
                # 是否进入素材
                is_a = False
                for row_area_i in range(len(row_info) - 1):
                    for row_area in range(row_info[row_area_i], row_info[row_area_i+1]):
                        if not is_a:
                            alpha.putpixel((row_area, h), 0)
                        if is_a:
                            pixel = alpha.getpixel((row_area, h))
                            alpha.putpixel((row_area, h), 255-int(pixel*0.3))
                    is_a = not is_a
            # 重新分解通道
            r, g, b = new_img.split()
            a_img = Image.merge('RGBA', (r, g, b, alpha))
            name = img_name.split('.')[0] + '_new'
            t = 'png'
            new_name = '.'.join([name, t])
            a_img.save(new_name)
    except Exception as e:
        print traceback.format_exc(e)
        

if __name__ == '__main__':
    get_area_image('test_7.jpg', 15)


