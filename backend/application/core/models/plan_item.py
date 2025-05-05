from .base import Base
from .mixins import IntIdPkMixin
from typing import TYPE_CHECKING
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import Text, String, ForeignKey, DateTime
from datetime import datetime

if TYPE_CHECKING:
  from .user import User


class PlanItem(Base, IntIdPkMixin):
  title: Mapped[str] = mapped_column(String(50))
  description: Mapped[str | None] = mapped_column(Text, nullable=True)

  start_time: Mapped[datetime | None] = mapped_column(
    DateTime(timezone=True),
    nullable=True
  )
  end_time: Mapped[datetime | None] = mapped_column(
    DateTime(timezone=True),
    nullable=True
  )

  user_id: Mapped[int] = mapped_column(ForeignKey(
    "users.id"
  ))

  user: Mapped["User"] = relationship(back_populates = "plan_items")