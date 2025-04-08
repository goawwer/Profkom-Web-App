from .base import Base
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, ForeignKey
from typing import TYPE_CHECKING
from .mixins import IntIdPkMixin

if TYPE_CHECKING:
  from .user import User

class Group(Base, IntIdPkMixin):
  name: Mapped[int] = mapped_column(String(40))

  users: Mapped[list["User"]] = relationship(back_populates="group")