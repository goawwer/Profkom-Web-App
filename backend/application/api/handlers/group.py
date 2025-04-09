from fastapi import APIRouter, Depends, HTTPException, status
from api.crud import group as crud
from typing import Annotated
from core.config import settings
from sqlalchemy.ext.asyncio import AsyncSession
from core.services.schedule import GroupScheduleService
from core.models import db_helper
from core.schemas.schedule import DayScheduleSchema
from core.schemas.group import GroupCreate
from core.dependencies.schedule_dependency import get_schedule_service

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
  existing_group = await crud.get_group_by_name(session=session, group_name=group_in.name)
  if existing_group:
    raise HTTPException(
      status_code = status.HTTP_400_BAD_REQUEST,
      detail = f"Группа {group_in.name} уже существует"
    )
  return await crud.create_group(
    session = session,
    group_in = group_in
  )

@router.get("/{group_id}/schedule/", response_model=list[DayScheduleSchema])
async def get_group_schedule(
  session: Annotated[AsyncSession, Depends(db_helper.session_getter)],
  service: Annotated[GroupScheduleService, Depends(get_schedule_service)],
  group_id: int,
  week_offset: int = 0,
):
  group = await crud.get_group_by_id(
    session=session,
    group_id=group_id
  )
  if not group:
    raise HTTPException(
      status_code=status.HTTP_404_NOT_FOUND,
      detail=f"Группа не найдена"
    )
  
  schedule = await service.fetch_schedule(group.name, week_offset)
  return schedule