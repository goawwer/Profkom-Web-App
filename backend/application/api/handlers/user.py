from fastapi import APIRouter, Depends, HTTPException, status
from core.config import settings
from core.models import User
from fastapi_users import BaseUserManager
from core.schemas.user import UserRead, UserUpdate, UserCreate
from api.dependencies.authentication.user_manager import get_user_manager
from api.dependencies.authentication.api_users import fastapi_users
from api.dependencies.authentication.api_users import current_superuser
import logging as logger

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


@router.get("/me")
async def me(user: User = Depends(fastapi_users.current_user(active=True))):
    user_data = {
        "id": user.id,
        "email": user.email,
        "username": user.username,
        "is_superuser": user.is_superuser,
        "group_id": user.group_id,
        "group_name": user.group.name,  
    }
    return user_data

# Кастомный обработчик для /users/{id}
@router.get("/{id}")
async def get_user(id: int, user_manager=Depends(get_user_manager)):
    user = await user_manager.get(id)
    user_data = {
        "id": user.id,
        "email": user.email,
        "username": user.username,
        "is_superuser": user.is_superuser,
        "group_id": user.group_id,
        "group_name": user.group.name, 
    }
    logger.debug(f"Prepared user data: {user_data}")
    return user_data

# Подключаем стандартный роутер, исключая /me и /users/{id} (GET)
standard_users_router = fastapi_users.get_users_router(UserRead, UserUpdate)
standard_users_router.routes = [
    route for route in standard_users_router.routes
    if not (route.path in [f"{settings.prefix.user}/me", f"{settings.prefix.user}/{{id}}"] and route.methods == ["GET"])
]

router.include_router(standard_users_router)