from fastapi_users import schemas
from core.types.user_id import UserIdType
from typing import Optional
import logging as logger
from pydantic import model_validator

class InternalUserCreate(schemas.BaseUserCreate):
    username: str
    group_id: int  # Соответствует модели User
    
class UserRead(schemas.BaseUser[UserIdType]):
    username: str
    group_id: int

class UserCreate(schemas.BaseUserCreate):
    username: str
    group_name: str

class UserUpdate(schemas.BaseUserUpdate):
    username: Optional[str]
    group_name: Optional[str]