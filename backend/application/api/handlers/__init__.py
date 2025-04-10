from fastapi import APIRouter, Depends
from core.config import settings
from .auth import router as auth_router 
from .user import router as user_router
from .group import router as group_router
from .plan_item import router as plans_router
from .profkom_event import router as events_router
from .note import router as notes_router
from fastapi.security import HTTPBearer

http_bearer = HTTPBearer(auto_error=False)

api_router = APIRouter(
  prefix=settings.prefix.title,
  dependencies=[Depends(http_bearer)]
)
api_router.include_router(router = auth_router)
api_router.include_router(router = user_router)
api_router.include_router(router = group_router)
api_router.include_router(router = plans_router)
api_router.include_router(router = events_router)
api_router.include_router(router = notes_router)