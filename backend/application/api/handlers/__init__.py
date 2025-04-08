from fastapi import APIRouter, Depends
from core.config import settings
from .auth import router as auth_router 
from .user import router as user_router
from fastapi.security import HTTPBearer

http_bearer = HTTPBearer(auto_error=False)

api_router = APIRouter(
  prefix=settings.prefix.title,
  dependencies=[Depends(http_bearer)]
)
api_router.include_router(router = auth_router)
api_router.include_router(router = user_router)
