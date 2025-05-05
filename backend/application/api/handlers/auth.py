from fastapi import APIRouter
from core.config import settings
from core.schemas.user import UserRead, UserCreate
from api.dependencies.authentication.api_users import fastapi_users, authentication_backend

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


# /request-verify-token
# /verify
router.include_router(
    router=fastapi_users.get_verify_router(UserRead),
)

# /forgot-password
# /reset-password
router.include_router(
    router=fastapi_users.get_reset_password_router(),
)