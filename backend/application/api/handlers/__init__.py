from fastapi import APIRouter
from core.config import settings
from .auth import router as auth_router 
from .user import router as user_router

api_router = APIRouter(prefix=settings.prefix.title)
api_router.include_router(router = auth_router)
api_router.include_router(router = user_router)
