from .base import Base
from .mixins import IntIdPkMixin
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, Text, DateTime, ForeignKey
from typing import TYPE_CHECKING
from datetime import datetime

if TYPE_CHECKING:
  from .user import User

class ProfkomEvent(Base, IntIdPkMixin):
  title: Mapped[str] = mapped_column(String(75))
  description: Mapped[str] = mapped_column(Text)
  start_time: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
  end_time: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
  location: Mapped[str] = mapped_column(String(50))

  user_id: Mapped[int] = mapped_column(ForeignKey(
    "users.id"
  ))

  creator: Mapped["User"] = relationship(back_populates="profkom_events")