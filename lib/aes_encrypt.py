# coding=utf-8

u"""
    加密、解密
"""

import base64
import hashlib
from Crypto import Random
from Crypto.Cipher import AES

BS = 16


def pad(s):
    return s + (BS - len(s) % BS) * chr(BS - len(s) % BS)


def unpad(s):
    return s[0:-ord(s[-1])]


class AESCipher(object):
    # 加密
    @staticmethod
    def encrypt(raw, key='LandsDoraLJKMars'):
        raw = pad(raw)
        Random.atfork()
        iv = Random.new().read(AES.block_size)
        cipher = AES.new(key, AES.MODE_CBC, iv)
        return base64.b64encode(iv + cipher.encrypt(raw))

    # 解密
    @staticmethod
    def decrypt(enc, key='LandsDoraLJKMars'):
        enc = base64.b64decode(enc)
        iv = enc[:16]
        cipher = AES.new(key, AES.MODE_CBC, iv)
        return unpad(cipher.decrypt(enc[16:]))


# md5签名
def md5sign(sign_data):
    # @param sign_data: 需要签名的字符串
    sign_result = hashlib.md5(str(sign_data)).hexdigest()
    return sign_result.upper()


if __name__ == '__main__':
    a = AESCipher.encrypt('Lands')
    print a
    print AESCipher.decrypt(a)
