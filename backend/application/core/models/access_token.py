from fastapi_users_db_sqlalchemy.access_token import(
  SQLAlchemyBaseAccessTokenTable, 
  SQLAlchemyAccessTokenDatabase,
)
from fastapi_users.db import SQLAlchemyBaseUserTable, SQLAlchemyUserDatabase
from sqlalchemy import Integer, ForeignKey
from typing import TYPE_CHECKING
from sqlalchemy.ext.asyncio import AsyncSession
from .base import Base
from types.user_id import UserIdType
from sqlalchemy.orm import Mapped, mapped_column

if TYPE_CHECKING: 
  from sqlalchemy.ext.asyncio import AsyncSession

class AccessToken(Base, SQLAlchemyBaseAccessTokenTable[UserIdType]):
  user_id: Mapped[UserIdType] = mapped_column(
    Integer, 
    ForeignKey("users.id", ondelete="cascade"), 
    nullable = False
  )

  @classmethod 
  def get_db(cls, session: "AsyncSession"):
    return SQLAlchemyBaseUserTable(session, cls)