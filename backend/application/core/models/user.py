from fastapi_users.db import SQLAlchemyBaseUserTable, SQLAlchemyUserDatabase
from .base import Base
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, ForeignKey
from core.types.user_id import UserIdType
from typing import TYPE_CHECKING
from .mixins import IntIdPkMixin
from .group import Group
from typing import Optional

if TYPE_CHECKING: 
  from sqlalchemy.ext.asyncio import AsyncSession
class User(Base, IntIdPkMixin, SQLAlchemyBaseUserTable[UserIdType]):
  
  username: Mapped[str] = mapped_column(String(40), unique=True)
  group_id: Mapped[int] = mapped_column(ForeignKey(
    "groups.id"
  ))
  
  group: Mapped["Group"] = relationship(back_populates="users")
  
  @classmethod 
  def get_db(cls, session: "AsyncSession"):
    return SQLAlchemyUserDatabase(session, cls)