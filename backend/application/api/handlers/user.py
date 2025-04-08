from fastapi import APIRouter
from core.config import settings
from core.schemas.user import UserRead, UserCreate
from api.dependencies.authentication.api_users_router import fastapi_users

router = APIRouter(
  prefix=settings.prefix.user,
  tags=["User"]
)

# /me 
# /{id}

router.include_router(
  router = fastapi_users.get_users_router(
    UserRead,
    UserCreate
  )
)