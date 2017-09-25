# coding=utf-8

import json
import requests
from model.session import get_session
from model.icon.icon import Icon

cookie = 'EGG_SESS=e6hqBJuT__uHyIYJpkwc761g_WS8J_ECmGvD25nL3K0I5KwtfjOcIcVA6-uWX3R9iSMnxkNhYqp4O0i90NFqZNhy6ACyV3iY' \
         'Y3AR0Eu0ylIIa_PmQ46C88vmgnxy6DANGyE_nmOlA2G1bouqd9v3GgXFssTggBlTaUhoThL1GMuBKSh8D-16bmAPDG5elF4HuhSyHTQN2Y' \
         'Dh-VzaF4mc0Fs9BM8ytLKDLxoqUbLhOdGr8kTKo3UrMUls9jA3eOTcrpBDeoMnDuOvjCf3h_YtQguNzKuk9hmyVb8JWJm4VHPhZ1V082KI' \
         '3zV3qO1Ybrb6sjQFMuRNZsKrFtdS_fVz1Za0H6LNBZXvsEJxUy2_nYK8k7oCWCyxDOrrTjxnNJzxFyLemT2Z0VM7Fo2o1mrMFimzwkNUd' \
         'geRvbGZG51l9Ybi6n4VlzmGvFORQ9wXHIWG4tKm9xHAhqvcEY0hmRqwotLtR4DkwSWiDEu9u93uDTcbeD2FxraGFupIqN8lQM8sGM8F-P' \
         'OOzIp7O2JlH8Lxx52IOMeULZzYh2ti-Hd9JRH1LR2LpA5b5P1ZT_RJiy2Q9WRC37P21z6U9L2Tr1xCMCu4GTsf8ByeMVB3NYjcgn8EFLj' \
         'ZPyJt4x3jR0pZ_xxUixcSFbT2mPbbYjq4GtC5MwSeSBtdPxiTtwTumZdOm6HKdk_4hF_DFtuzmI1_Vng5jtgTSlOV3jD214eFrDaKp5TU' \
         'UCqIGvvjSID54ImybKJoj7P2UDQc-JZNYIlclnCH3bgqFVF6Tt6t_0BQyhaAPSq0xhUnej1oJWJnaFfNUa3Jo7pS8AWB8GEzQ5qy-piGcM' \
         '__Gahn1lNTPDnu-W6yW3FoXqW1f8vK3nxjI11ZAXWARH2ElSqgrlAowWBJHVJW8mwE276zwAocgU04nTbBvtpz-2E4DKxl_ubCWzyGgblM' \
         'SeVchuQasefEG7hHd7h3Z07Un1OplCtMY97SNB1sfbEgVAL1YJw6Ct3ApZBjhOyY1CXk5hvYSArL1XGC1v2bkCX1aWJN7XXRWsmZ-1EEtvE' \
         'I77i6fuE5ONPV7w-uPT576BI3v0D-LKTFj3oF0kki0lG2dfzeqZs6UW6oZX7LMsirzk1BSb963sjYR5BDlfdG4fJwKWNpEHJQs7pxSPJuB' \
         '3JXFX2PHOk5iP7Pmq-R6A==; UM_distinctid=15ad5d438f3184-0bc1f6a88-671b107a-1aeaa0-15ad5d438f49a6; CNZZDATA10' \
         '00158776=1015333910-1484289687-null%7C1493793808; l=AggI1TraSqZ9ypPUq-PdYrx1WHgORWyB; ctoken=mEKnXovYB9Ti5' \
         'P5Z8Pbyicon-font; cna=RHDcDoXo+nECAdrxqmpBN3kE; CNZZDATA1260547936=554937167-1493946988-null%7C1498030029;' \
         ' u=304428; isg=AsrKoy-Kp09dECug_1LX1X-rG7CsE3YUo0Qb81QDdp2oB2rBPEueJRBxY0Yh'


class IconFontSource:
    def __init__(self, page):
        self.index_json_url = r'http://www.iconfont.cn/api/collections.json'
        self.params = {
            'type': 3,
            'page': page,
            'ctoken': 'mEKnXovYB9Ti5P5Z8Pbyicon-font'
        }
        self.headers = {
            'Host': 'www.iconfont.cn',
            'Connection': 'keep-alive',
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'X-Requested-With': 'XMLHttpRequest',
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 '
                          '(KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36',
            'Referer': 'http://www.iconfont.cn/collections/index?type=3&page=2',
            'Accept-Encoding': 'gzip, deflate, sdch',
            'Accept-Language': 'zh-CN,zh;q=0.8',
            'Cookie': cookie
        }

    def get_index_info(self):
        result = {
            'response': 'ok',
            'info': ''
        }
        try:
            response = requests.get(self.index_json_url, params=self.params, headers=self.headers, timeout=30)
            content = json.loads(response.content)
            data = content.get('data', None)
            if data:
                count = data.get('count', 0)
                if count:
                    data_list = data.get('lists', None)
                    for data_info in data_list:
                        author = data_info.get('create_user_id', None)
                        desc = data_info.get('description', None)
                        series_name = data_info.get('name', None)
                        series_id = data_info.get('id', None)
                        slug = data_info.get('slug', None)
                        icons = data_info.get('icons', None)
                        if icons:
                            for info in icons:
                                store_icon(info, author, desc, series_name, series_id, slug)
                        else:
                            result.update({
                                'response': 'fail',
                                'info': 'can not get icons'
                            })
                            print result
                else:
                    result.update({
                        'response': 'fail',
                        'info': 'count is zero'
                    })
                    return result
            else:
                result.update({
                    'response': 'fail',
                    'info': 'can not get data'
                })
                return result
        except requests.exceptions.ConnectTimeout:
            result.update({
                'response': 'fail',
                'info': 'response connected timeout'
            })
            return result
        except requests.exceptions.Timeout:
            result.update({
                'response': 'fail',
                'info': 'response connected timeout'
            })
            return result


def store_icon(info, author, desc, series_name, series_id, slug):
    try:
        with get_session() as db_session:
            svg = info.get('show_svg', None)
            width = info.get('width', None)
            height = info.get('height', None)
            name = info.get('name', None)
            if svg:
                icon = Icon()
                icon.author = author
                icon.svg = svg
                icon.height = height
                icon.width = width
                icon.name = name
                icon.series_name = series_name
                icon.series_id = series_id
                icon.slug = slug
                icon.desc = desc
                db_session.add(icon)
                db_session.commit()
    except Exception as e:
        print e

if __name__ == '__main__':
    pass
