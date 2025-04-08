from .auth import router as auth_router 
from fastapi import APIRouter
from core.config import settings

router = APIRouter(prefix=settings.prefix.title)
router.include_router(router = auth_router)