import logging
from typing import Optional, TYPE_CHECKING
from fastapi import HTTPException, status
from fastapi_users import BaseUserManager, IntegerIDMixin
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from core.schemas.user import UserCreate, InternalUserCreate
from core.types.user_id import UserIdType
from core.models import User
from core.config import settings
from core.models import Group

log = logging.getLogger(__name__)

if TYPE_CHECKING:
    from fastapi import Request
    from sqlalchemy import Result

class UserManager(IntegerIDMixin, BaseUserManager[User, UserIdType]):


    reset_password_token_secret = settings.access_token.reset_password_token_secret
    verification_token_secret = settings.access_token.verification_token_secret

    async def create(
            self, 
            user_create: UserCreate,  
            request: Optional["Request"] = None,
            safe: bool = False
    ) -> User:
        group_query = select(Group).where(Group.name == user_create.group_name)
        result: "Result" = await self.user_db.session.execute(group_query)
        group = result.scalar_one_or_none()

        if not group:
            raise HTTPException(
                status_code = status.HTTP_404_NOT_FOUND,
                detail = f"Группа с именем {user_create.group_name} не найдена"
            )
        
        user_dict = user_create.model_dump(exclude={"group_name"})
        user_dict["group_id"] = group.id
        
        created_user = await super().create(
            InternalUserCreate(**user_dict),
            safe=safe,
            request=request
        )
        
        created_user.group_name = group.name

        return created_user
    
    async def get(self, id: UserIdType) -> User:
        # Переопределяем метод get, чтобы подгрузить group
        query = select(User).where(User.id == id).options(selectinload(User.group))
        result = await self.user_db.session.execute(query)
        user = result.scalar_one_or_none()
        if user is None:
            raise HTTPException(status_code=404, detail="User not found")
        return user

    async def on_after_register(self, user: User, request: Optional["Request"] = None):
        log.warning("User %r has registered.", user.id)
        
    async def on_after_forgot_password(
        self, user: User, token: str, request: Optional["Request"] = None
    ):
        log.warning("User %r has forgot their password. Reset token: %r", user.id, token)

    async def on_after_request_verify(
        self, user: User, token: str, request: Optional["Request"] = None
    ):
        log.warning("Verification requested for user %r. Verification token: %r", user.id, token)