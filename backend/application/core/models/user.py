from fastapi_users.db import SQLAlchemyBaseUserTable, SQLAlchemyUserDatabase
from .base import Base
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, ForeignKey
from types.user_id import UserIdType
from typing import TYPE_CHECKING

if TYPE_CHECKING: 
  from sqlalchemy.ext.asyncio import AsyncSession
class User(Base, SQLAlchemyBaseUserTable[UserIdType]):
  
  username: Mapped[str] = mapped_column(String(40), unique=True)
  
  @classmethod 
  def get_db(cls, session: "AsyncSession"):
    return SQLAlchemyUserDatabase(session, cls)