from fastapi_users.db import SQLAlchemyBaseUserTable, SQLAlchemyUserDatabase
from .base import Base
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, ForeignKey
from core.types.user_id import UserIdType
from typing import TYPE_CHECKING
from .mixins import IntIdPkMixin

if TYPE_CHECKING: 
  from sqlalchemy.ext.asyncio import AsyncSession
  from .plan_item import PlanItem
  from .group import Group
class User(Base, IntIdPkMixin, SQLAlchemyBaseUserTable[UserIdType]):
  
  username: Mapped[str] = mapped_column(String(40), unique=True)
  group_id: Mapped[int] = mapped_column(ForeignKey(
    "groups.id"
  ))
  
  group: Mapped["Group"] = relationship(back_populates="users")

  plan_items: Mapped[list["PlanItem"]] = relationship(back_populates="user")
  
  @classmethod 
  def get_db(cls, session: "AsyncSession"):
    return SQLAlchemyUserDatabase(session, cls)