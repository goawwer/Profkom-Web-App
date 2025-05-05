from .base import Base
from .mixins import IntIdPkMixin
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, Text, ForeignKey, Boolean, DateTime
from typing import TYPE_CHECKING
from datetime import datetime

if TYPE_CHECKING:
  from .user import User

class Note(Base, IntIdPkMixin):
  title: Mapped[str] = mapped_column(String(50), nullable=True)
  text: Mapped[str] = mapped_column(Text)
  created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True))
  is_important: Mapped[bool] = mapped_column(Boolean, default=False)

  user_id: Mapped[int] = mapped_column(ForeignKey(
    "users.id"
  ))
  user: Mapped["User"] = relationship(back_populates="notes") 