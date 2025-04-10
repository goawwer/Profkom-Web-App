from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from api.crud import note as crud
from core.config import settings
from core.models import User, db_helper, Note
from core.schemas.note import NoteCreate, NoteUpdate, NoteUpdatePartial
from typing import Annotated
from api.dependencies.authentication.api_users import current_user

router = APIRouter(
    prefix=settings.prefix.note,
    tags=["Notes"]
)


@router.get("/all")
async def get_all_notes(
    user: Annotated[User, Depends(current_user)],
    session: Annotated[AsyncSession, Depends(db_helper.session_getter)]
):
    return await crud.get_notes(session=session, user_id=user.id)

@router.get("/{note_id}/")
async def get_note(
    user: Annotated[User, Depends(current_user)],
    session: Annotated[AsyncSession, Depends(db_helper.session_getter)],
    note_id: int
):
    return await crud.get_note(
        user_id = user.id,
        session=session,
        note_id=note_id
    )

@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_note(
    user: Annotated[User, Depends(current_user)],
    session: Annotated[AsyncSession, Depends(db_helper.session_getter)],
    note_in: NoteCreate
):
    return await crud.create_note(
        session=session,
        note_in=note_in,
        user_id=user.id
    )

@router.put("/{note_id}/")
async def update_note(
    note_id: int,
    user: Annotated[User, Depends(current_user)],
    session: Annotated[AsyncSession, Depends(db_helper.session_getter)],
    note_update: NoteUpdate,
):
    note = await crud.get_note(
        session=session,
        note_id = note_id,
        user_id=user.id
    )

    if not note:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"PlanItem с ID {note_id} не найден"
        )

    updated_note = await crud.update_note(
        user_id=user.id,
        session=session,
        note=note,
        note_update=note_update
    )
    return updated_note

@router.patch("/{note_id}/")
async def update_note_partial(
    note_id: int,
    user: Annotated[User, Depends(current_user)],
    session: Annotated[AsyncSession, Depends(db_helper.session_getter)],
    note_update: NoteUpdatePartial,
):
    note = await crud.get_note(
        session=session,
        note_id=note_id,
        user_id=user.id
    )

    if not note:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"PlanItem с ID {note_id} не найден"
        )

    updated_note = await crud.update_note(
        user_id=user.id,
        session=session,
        note=note,
        note_update=note_update,
        partial=True
    )
    return updated_note

@router.delete("/{note_id}/")
async def delete_note(
    note_id: int,
    user: Annotated[User, Depends(current_user)],
    session: Annotated[AsyncSession, Depends(db_helper.session_getter)],
):
    note = await crud.get_note(
        session=session,
        note_id=note_id,
        user_id=user.id
    )

    if not note:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"PlanItem с ID {note_id} не найден"
        )
    
    deleted_item = await crud.delete_note(
        user_id=user.id,
        session=session,
        note=note,
    )
    return f"Запись удалена"