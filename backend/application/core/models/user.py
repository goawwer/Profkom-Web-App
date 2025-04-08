from fastapi_users.db import SQLAlchemyBaseUserTable
from .base import Base
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, ForeignKey
from typing import TYPE_CHECKING

class User(Base, SQLAlchemyBaseUserTable[int]):
  
  username: Mapped[str] = mapped_column(String(40), unique=True)
  
