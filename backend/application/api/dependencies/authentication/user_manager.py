from core.authentication.user_manager import UserManager
from .users import get_users_db
from typing import TYPE_CHECKING, Annotated
from fastapi import Depends

if TYPE_CHECKING:
    from sqlalchemy.ext.asyncio import AsyncSession

async def get_user_manager(user_db: Annotated["AsyncSession", Depends(get_users_db)]):
    yield UserManager(user_db)

    