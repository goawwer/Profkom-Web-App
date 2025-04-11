from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import ORJSONResponse
from fastapi import FastAPI
from core.models import db_helper
from contextlib import asynccontextmanager
from core.config import settings
from api.handlers import api_router
from scripts.create_superuser import create_superuser
import uvicorn
import logging

log = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):

  #superuser
  try:
    await create_superuser()
  except Exception as e:
    log.exception("Не удалось создать суперпользователя: %r", e)
  #start
  yield
  #shutdown
  db_helper.dispose()

def create_app() -> FastAPI:
  main_app = FastAPI(
    default_response_class=ORJSONResponse,
    title="HAHA",
    lifespan=lifespan
  )

  main_app.add_middleware(
    CORSMiddleware,
    allow_origins="http://localhost:5173",
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
  )

  main_app.include_router(router=api_router)
  return main_app

main_app = create_app()

if __name__ == "__main__":
  uvicorn.run(
    "main:main_app",
    host=settings.run.host,
    port=settings.run.port,
    reload=True
  )