from fastapi_users import schemas
from types.user_id import UserIdType
from pydantic import ConfigDict

class UserBase(schemas.BaseUser[UserIdType]):
    username: str

class UserRead(UserBase):
    pass

class UserCreate(UserBase):
    pass

class UserUpdate(UserCreate):
    pass

class UserUpdatePartial(UserCreate):
    username: str | None = None

class User(UserBase):
    model_config = ConfigDict(
        from_attributes = True
    )
    id: int