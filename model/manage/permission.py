# coding=utf-8

from sqlalchemy import Column, Integer, String, BigInteger
from model.base import Base, IdGenerator


class RolePermissionRel(Base):
    __tablename__ = 'manage_role_permission_rel'

    id = Column(BigInteger, default=IdGenerator.gen, primary_key=True)
    # 角色ID
    role_id = Column(BigInteger, nullable=False, index=True)
    # 菜单功能ID
    menu_func_id = Column(BigInteger, index=True)

    def to_dict(self):
        return {
            'id': str(self.id),
            'role_id': str(self.role_id),
            'menu_func_id': str(self.menu_func_id)
        }