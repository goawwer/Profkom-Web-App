from fastapi_users import schemas
from core.types.user_id import UserIdType
from typing import Optional
from pydantic import model_validator

class InternalUserCreate(schemas.BaseUserCreate):
    username: str
    group_id: int  # Соответствует модели User
    
class UserRead(schemas.BaseUser[UserIdType]):
    username: str
    group_name: str

    @model_validator(mode="before")
    def set_group_name(cls, values):
        if isinstance(values, dict):
            # Если group уже загружен, используем его
            group = values.get("group")
            if group and hasattr(group, "name"):
                values["group_name"] = group.name
            else:
                # Если group не загружен, полагаемся на group_name, если он есть
                values["group_name"] = values.get("group_name", None)
        return values

class UserCreate(schemas.BaseUserCreate):
    username: str
    group_name: str

class UserUpdate(schemas.BaseUserUpdate):
    username: Optional[str]
    group_name: Optional[str]