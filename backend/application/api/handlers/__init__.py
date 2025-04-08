from .auth import router as auth_router 
from fastapi import APIRouter
from core.config import settings

api_router = APIRouter(prefix=settings.prefix.title)
api_router.include_router(router = auth_router)