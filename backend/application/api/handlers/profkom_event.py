from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from api.crud import profkom_event as crud
from core.config import settings
from core.models import User, db_helper, ProfkomEvent
from core.schemas.profkom_event import ProfkomEventCreate, ProfkomEventUpdate, ProfkomEventUpdatePartial
from typing import Annotated
from api.dependencies.authentication.api_users import current_user

router = APIRouter(
    prefix=settings.prefix.profkom_event,
    tags=["Profkom events"]
)


@router.get("/all")
async def get_all_events(
    session: Annotated[AsyncSession, Depends(db_helper.session_getter)]
):
    return await crud.get_events(session=session)

@router.get("/{event_id}/")
async def get_event(
    session: Annotated[AsyncSession, Depends(db_helper.session_getter)],
    event_id: int
):
    return await crud.get_event(
        session = session,
        event_id = event_id
    )

@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_event(
    user: Annotated[User, Depends(current_user)],
    session: Annotated[AsyncSession, Depends(db_helper.session_getter)],
    event_in: ProfkomEventCreate
):
    if user.is_superuser:
        return await crud.create_event(
            session = session,
            event_in = event_in,
            user_id = user.id
    )
    raise HTTPException(
        status_code=status.HTTP_403_FORBIDDEN
    )

@router.put("/{event_id}/")
async def update_event(
    event_id: int,
    user: Annotated[User, Depends(current_user)],
    session: Annotated[AsyncSession, Depends(db_helper.session_getter)],
    event_update: ProfkomEventUpdate,
):
    if user.is_superuser:
        event = await crud.get_event(
        session = session,
        event_id = event_id,
        user_id = user.id
    )
        if not event:
            raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"PlanItem с ID {event_id} не найден"
        )
        updated_event = await crud.update_event(
            user_id=user.id,
            session=session,
            event = event,
            event_update=event_update
        )
        return updated_event
    raise HTTPException(
        status_code=status.HTTP_403_FORBIDDEN
    )


@router.patch("/{event_id}/")
async def update_event_partial(
    event_id: int,
    user: Annotated[User, Depends(current_user)],
    session: Annotated[AsyncSession, Depends(db_helper.session_getter)],
    event_update: ProfkomEventUpdatePartial,
):
    if user.is_superuser:
        event = await crud.get_event(
        session = session,
        event_id = event_id,
        user_id = user.id
    )
        if not event:
            raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"PlanItem с ID {event_id} не найден"
        )
        updated_event = await crud.update_event(
            user_id=user.id,
            session=session,
            event = event,
            event_update=event_update,
            partial = True
        )
        return updated_event
    raise HTTPException(
        status_code=status.HTTP_403_FORBIDDEN
    )

@router.delete("/{event_id}/")
async def delete_plan_item(
    event_id: int,
    user: Annotated[User, Depends(current_user)],
    session: Annotated[AsyncSession, Depends(db_helper.session_getter)],
):
    if user.is_superuser:
        event = await crud.get_event(
        session = session,
        event_id = event_id,
        user_id = user.id
    )
        if not event:
            raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"PlanItem с ID {event_id} не найден"
        )
        deleted_event = await crud.delete_event(
            user_id=user.id,
            session=session,
            event = event,
        )
        return f"Запись удалена"
    raise HTTPException(
        status_code=status.HTTP_403_FORBIDDEN
    )