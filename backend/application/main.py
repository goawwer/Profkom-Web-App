from fastapi import FastAPI
from core.models import db_helper
from contextlib import asynccontextmanager
from core.config import settings
from api.handlers import api_router
import uvicorn

@asynccontextmanager
async def lifespan(app: FastAPI):
  #start
  yield
  #shutdown
  db_helper.dispose()

def create_app() -> FastAPI:
  main_app = FastAPI(
    title="HAHA",
    lifespan=lifespan
  )
  main_app.include_router(router=api_router)
  return main_app

main_app = create_app()

if __name__ == "__main__":
  uvicorn.run(
    "main:main_app",
    reload=True
  )