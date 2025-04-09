from fastapi import APIRouter, Depends
from api.crud import group as crud
from typing import Annotated
from core.config import settings
from sqlalchemy.ext.asyncio import AsyncSession

from core.models import db_helper
from core.schemas import GroupCreate

router = APIRouter(
  prefix=settings.prefix.group,
  tags=["Group"]
)

@router.get("/")
async def get_groups(
  session: Annotated[AsyncSession, Depends(db_helper.session_getter)]
):
  return await crud.get_all_groups(session=session)

@router.get("/{group_id}")
async def get_group(
  session: Annotated[AsyncSession, Depends(db_helper.session_getter)],
  group_id: int
): 
  return await crud.get_group_by_id(
    session=session,
    group_id = group_id
  )


@router.post("/")
async def create_group(
  session: Annotated[AsyncSession, Depends(db_helper.session_getter)],
  group_in: GroupCreate
):
  return await crud.create_group(
    session=session,
    group_in=group_in
  )