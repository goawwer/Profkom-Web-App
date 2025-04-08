from fastapi import APIRouter
from core.config import settings
from core.schemas.user import UserRead, UserCreate
from api.dependencies.authentication.api_users_router import fastapi_users, authentication_backend

router = APIRouter(
  prefix=settings.prefix.auth,
  tags=["Auth"]
)

# /login
# /logout
router.include_router(
  router = fastapi_users.get_auth_router(authentication_backend)
)

# /register 
router.include_router(
  router = fastapi_users.get_register_router(UserRead, UserCreate)
)