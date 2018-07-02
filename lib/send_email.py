# coding=utf-8

import os
import smtplib
import traceback
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.utils import formatdate

DEBUG = True
# EMAIL_PASSWORD = os.environ.get('EMAIL_PASSWORD')

EMAIL_PASSWORD = open(r'C:\Users\fangjiayao\Desktop\website_conf\email_password.txt').read()

# 发送邮件相关
SMTP_CONFIG = {
    'host': 'smtp.exmail.qq.com',
    'port': '25',
    'from_email': 'zhaoyuting@ixianxia.com',
    'user': 'zhaoyuting@ixianxia.com',
    'pwd': EMAIL_PASSWORD
}


def send_email(subject, content, to_someone, **smtp_config):
    result = {
        'response': 'ok',
        'info': '发送成功'
    }
    try:
        smtp_host = smtp_config['host'] if 'host' in smtp_config else SMTP_CONFIG['host']
        smtp_port = smtp_config['port'] if 'port' in smtp_config else SMTP_CONFIG['port']
        smtp_user = smtp_config['user'] if 'user' in smtp_config else SMTP_CONFIG['user']
        smtp_pwd = smtp_config['pwd'] if 'pwd' in smtp_config else SMTP_CONFIG['pwd']
        from_email = smtp_config['from_email'] if 'from_email' in smtp_config else SMTP_CONFIG['from_email']

        msg = MIMEMultipart()
        msg['From'] = from_email
        msg['Subject'] = subject
        msg['To'] = to_someone
        msg['Date'] = formatdate(localtime=True)
        msg.attach(MIMEText(content, 'html', _charset='UTF-8'))

        smtp = smtplib.SMTP(host=smtp_host, port=smtp_port)
        if DEBUG:
            smtp.set_debuglevel(1)
        smtp.login(smtp_user, smtp_pwd)
        smtp.sendmail(from_email, to_someone, msg.as_string())
        smtp.quit()
    except Exception as e:
        print traceback.format_exc(e)
        result = {
            'response': 'fail',
            'info': '发送失败'
        }
    return result


if __name__ == '__main__':
    # send_email(u'测试账户激活', u'这是一封用于测试的邮件', u'380788433@qq.com')
    print EMAIL_PASSWORD