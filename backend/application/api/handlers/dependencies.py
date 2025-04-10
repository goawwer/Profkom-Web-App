# api/dependencies.py
from typing import Annotated, Type, TypeVar, Callable
from fastapi import Path, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from core.models import db_helper, User
from api.dependencies.authentication.api_users import current_user

T = TypeVar("T")

class BaseObjectDependency:
    
    def __init__(self, cls: Type[T], crud_func: Callable, path_param: str):
        self.cls = cls
        self.crud_func = crud_func
        self.path_param = path_param

    async def __call__(
        self,
        obj_id: Annotated[int, Path],
        user: Annotated[User, Depends(current_user)],
        session: Annotated[AsyncSession, Depends(db_helper.session_getter)],
    ) -> T:
        obj = await self.crud_func(session=session, item_id=obj_id, user_id=user.id)
        if not obj:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"{self.cls.__name__} с ID {obj_id} не найдена"
            )
        return obj

def get_object_dependency(cls: Type[T], crud_func: Callable, path_param: str):
    return BaseObjectDependency(cls, crud_func, path_param)