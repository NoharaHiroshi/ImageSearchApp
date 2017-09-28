# coding=utf-8

from flask.ext.login import UserMixin
from sqlalchemy import Column, Integer, String, BigInteger
from sqlalchemy import UniqueConstraint

from model.base import Base, IdGenerator
from model.session import get_session
from redis_store.redis_cache import common_redis

from model.manage.permission import RolePermissionRel
from model.manage.role import Role, UserRole

from lib.aes_encrypt import AESCipher


class User(Base, UserMixin):
    __tablename__ = 'manage_user'
    # 添加唯一性约束，一个项目中只能有一个注册邮箱
    __table_args__ = (
        UniqueConstraint('email', name='email'),
    )

    # 类型：管理员、超级管理员
    TYPE_MANAGE, TYPE_SUPER_MANAGE = range(2)
    # 状态：关闭、正常
    STATUS_OFF, STATUS_NORMAL = range(2)

    id = Column(BigInteger, default=IdGenerator.gen, primary_key=True)
    # 注册邮箱
    email = Column(String(55), index=True, nullable=False)
    # 注册名称
    name = Column(String(55), nullable=False)
    # 注册密码
    password = Column(String(255), nullable=False)
    # 成员类型
    type = Column(Integer, default=TYPE_MANAGE, nullable=False)
    # 成员状态
    status = Column(Integer, default=STATUS_NORMAL, nullable=False)
    # 成员手机号
    phone = Column(String(55), default='')
    # 创建者
    creator_id = Column(BigInteger, nullable=True)

    @property
    def status_text(self):
        s = {
            self.STATUS_OFF: u'关闭',
            self.STATUS_NORMAL: u'正常'
        }
        return s.get(self.status, u'未知状态')

    @property
    def type_text(self):
        s = {
            self.TYPE_MANAGE: u'管理员',
            self.TYPE_SUPER_MANAGE: u'超级管理员',
        }

        return s.get(self.type, u'未知身份')

    @property
    def user_menu(self):
        key = u'user_menu_%s' % self.id
        menu_list = common_redis.get(key)

        if not menu_list:
            with get_session() as db_session:
                user_roles = db_session.query(UserRole).filter(
                    UserRole.user_id == self.id
                ).all()
                user_role_ids = [user_role.id for user_role in user_roles]
                menu_list = list()
                all_menu = db_session.query(RolePermissionRel).filter(
                    RolePermissionRel.role_id.in_(user_role_ids),
                    RolePermissionRel.permission_type == RolePermissionRel.TYPE_MENU
                ).all()
                if all_menu:
                    menu_list = [menu.id for menu in all_menu]

        return menu_list

    @property
    def user_permission(self):
        key = u'user_permission_%s' % self.id
        permission_list = common_redis.get(key)

        if not permission_list:
            with get_session() as db_session:
                user_roles = db_session.query(UserRole).filter(
                    UserRole.user_id == self.id
                ).all()
                user_role_ids = [user_role.id for user_role in user_roles]
                permission_list = list()
                all_permission = db_session.query(RolePermissionRel).filter(
                    RolePermissionRel.role_id.in_(user_role_ids),
                    RolePermissionRel.permission_type == RolePermissionRel.TYPE_MENU_FUNC
                ).all()
                if all_permission:
                    permission_list = [permission.id for permission in all_permission]

        return permission_list

    def is_status_active(self):
        return self.status == self.STATUS_NORMAL

    def is_type_manage(self):
        return self.type == self.TYPE_MANAGE

    def is_type_super_manage(self):
        return self.type == self.TYPE_SUPER_MANAGE

    def set_password(self, password):
        self.password = AESCipher.encrypt(password)

    def check_password(self, password):
        if AESCipher.decrypt(self.passwd) == password:
            return True
        else:
            return False

    def to_dict(self):
        return {
            'id': str(self.id),
            'email': self.email,
            'name': self.name,
            'status': self.status,
            'status_text': self.status_text,
            'type_text': self.type_text,
            'phone': self.phone,
            'created_date': self.created_date.strftime('%Y-%m-%d %H:%M:%S'),
            'modified_date': self.modified_date.strftime('%Y-%m-%d %H:%M:%S'),
            'is_type_manage': self.is_type_manage(),
            'is_type_super_manage': self.is_type_super_manage(),
            'is_status_active': self.is_status_active()
        }