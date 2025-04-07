from sqlalchemy.orm import DeclarativeBase, declared_attr
from .mixins import IntIdPkMixin

class Base(IntIdPkMixin, DeclarativeBase):
  __abstract__ = True

  @declared_attr
  def __tablename__(cls):
    return f"{cls.__name__.lower()}s"
  