from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from api.crud import access_token as crud
from core.models import User, AccessToken, db_helper
from api.dependencies.authentication.api_users import current_user
from core.models import AccessToken
from typing import Annotated

router = APIRouter(
  prefix="/access_token",
  tags=["Access Token"]
)

@router.get("/")
async def get_token(
  user: Annotated[User, Depends(current_user)],
  session: Annotated[AsyncSession, Depends(db_helper.session_getter)],
):
  return await crud.get_token(
    user=user,
    session=session
  )
