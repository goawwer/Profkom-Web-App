from fastapi import APIRouter, Depends, HTTPException, status
from api.crud import group as crud
from typing import Annotated
from core.config import settings
from sqlalchemy.ext.asyncio import AsyncSession
from core.services.schedule import GroupScheduleService
from core.models import db_helper, User
from core.schemas.schedule import DayScheduleSchema
from core.schemas.group import GroupCreate, GroupUpdate, GroupUpdatePartial
from core.dependencies.schedule_dependency import get_schedule_service
from api.dependencies.authentication.api_users import current_user

router = APIRouter(
  prefix=settings.prefix.group,
  tags=["Group"]
)

@router.get("/")
async def get_groups(
  user: Annotated[User, Depends(current_user)],
  session: Annotated[AsyncSession, Depends(db_helper.session_getter)]
):
  if not user.is_superuser:
    raise HTTPException(
      status_code=status.HTTP_403_FORBIDDEN,
      detail="У вас нет доступа к этой функции"
    )
  
  return await crud.get_all_groups(session=session)

@router.get("/{group_id}")
async def get_group(
  user: Annotated[User, Depends(current_user)],
  session: Annotated[AsyncSession, Depends(db_helper.session_getter)],
  group_id: int
): 
  group = await crud.get_group_by_id(
    session=session,
    group_id = group_id
  )
  if not group: 
    raise HTTPException(
      status_code=status.HTTP_404_NOT_FOUND, 
      detail="Группа не найдена"
    )
  
  if user.group_id != group_id and not user.is_superuser:
    raise HTTPException(
      status_code=status.HTTP_403_FORBIDDEN,
      detail="У вас нет доступа к этой группе"
    )
  
  return group



@router.post("/")
async def create_group(
  user: Annotated[User, Depends(current_user)],  
  session: Annotated[AsyncSession, Depends(db_helper.session_getter)],
  group_in: GroupCreate
):
  if not user.is_superuser:
    raise HTTPException(
      status_code=status.HTTP_403_FORBIDDEN,
      detail="У вас нет прав на создание группы"
    )

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

@router.put("/{group_id}/")
async def update_group(
  group_id: int,
  user: Annotated[User, Depends(current_user)],  
  session: Annotated[AsyncSession, Depends(db_helper.session_getter)],
  group_update: GroupUpdate,
):
  if not user.is_superuser:
    raise HTTPException(
      status_code=status.HTTP_403_FORBIDDEN,
      detail="У вас нет прав на изменение группы"
    )
  
  group = await get_group(
    session=session,
    group_id=group_id,
  )

  if not group:
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"PlanItem с ID {group_id} не найден"
      )
  
  updated_group = await crud.update_group(
        user_id=user.id,
        session=session,
        group=group,
        group_update=group_update
    )
  return updated_group


@router.patch("/{group_id}/")
async def update_group(
  group_id: int,
  user: Annotated[User, Depends(current_user)],  
  session: Annotated[AsyncSession, Depends(db_helper.session_getter)],
  group_update: GroupUpdatePartial,
):
  if not user.is_superuser:
    raise HTTPException(
      status_code=status.HTTP_403_FORBIDDEN,
      detail="У вас нет прав на изменение группы"
    )
  
  group = await get_group(
    session=session,
    group_id=group_id,
  )

  if not group:
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"PlanItem с ID {group_id} не найден"
      )
  
  updated_group = await crud.update_group(
        user_id=user.id,
        session=session,
        group=group,
        group_update=group_update,
        partial=True
    )
  return updated_group

@router.delete("{group_id}")
async def delete_group(
  group_id: int,
  user: Annotated[User, Depends(current_user)],  
  session: Annotated[AsyncSession, Depends(db_helper.session_getter)],
):
  if not user.is_superuser:
    raise HTTPException(
      status_code=status.HTTP_403_FORBIDDEN,
      detail="У вас нет прав на удаление группы"
    )
  
  group = await get_group(
    session=session,
    group_id=group_id,
  )

  if not group:
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"PlanItem с ID {group_id} не найден"
      )
  
  await crud.delete_group(
    session=session,
    group=group
  )

  return f"Группа удалена"
  

@router.get("/{group_id}/schedule/", response_model=list[DayScheduleSchema])
async def get_group_schedule(
  user: Annotated[User, Depends(current_user)],  
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
  
  if user.group_id != group_id and not user.is_superuser:
    raise HTTPException(
      status_code=status.HTTP_403_FORBIDDEN,
      detail="У вас нет доступа к расписанию этой группы"
    )
  
  schedule = await service.fetch_schedule(group.name, week_offset)
  return schedule