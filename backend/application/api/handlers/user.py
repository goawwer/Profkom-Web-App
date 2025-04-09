from fastapi import APIRouter, Depends, HTTPException, status
from core.config import settings
from core.models import User
from fastapi_users import BaseUserManager
from core.schemas.user import UserRead, UserUpdate, UserCreate
from api.dependencies.authentication.user_manager import get_user_manager
from api.dependencies.authentication.api_users import fastapi_users
from api.dependencies.authentication.api_users import current_superuser

router = APIRouter(
  prefix=settings.prefix.user,
  tags=["User"]
)

@router.post("/create-superuser", response_model=UserRead)
async def create_superuser(
    user_create: UserCreate,
    user_manager: BaseUserManager = Depends(get_user_manager),
    current_user: User = Depends(current_superuser)
):
    existing_user = await user_manager.get_by_email(user_create.email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Пользователь с email {user_create.email} уже существует"
        )
    user_create.is_superuser = True
    user = await user_manager.create(user_create)
    return user


# /me 
# /{id}

router.include_router(
  router = fastapi_users.get_users_router(
    UserRead,
    UserUpdate
  )
)