from fastapi import APIRouter
from core.config import settings
from api.dependencies.authentication.api_users_router import fastapi_users, authentication_backend

router = APIRouter(
  prefix=settings.prefix.auth,
  tags=["Auth"]
)

router.include_router(
  router = fastapi_users.get_auth_router(authentication_backend)
)