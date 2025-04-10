from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from api.crud import plan_item as crud
from core.config import settings
from core.models import User, db_helper, PlanItem
from core.schemas.plan_item import PlanItemCreate, PlanItemUpdate, PlanItemUpdatePartial
from typing import Annotated
from api.dependencies.authentication.api_users import current_user

router = APIRouter(
    prefix=settings.prefix.plan_item,
    tags=["Plan Items"]
)


@router.get("/all")
async def get_all_plans(
    user: Annotated[User, Depends(current_user)],
    session: Annotated[AsyncSession, Depends(db_helper.session_getter)]
):
    return await crud.get_plan_items(session=session, user_id=user.id)

@router.get("/{plan_item_id}/")
async def get_plan_item(
    user: Annotated[User, Depends(current_user)],
    session: Annotated[AsyncSession, Depends(db_helper.session_getter)],
    item_id: int
):
    return await crud.get_plan_item(
        user_id = user.id,
        session=session,
        item_id=item_id
    )

@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_plan_item(
    user: Annotated[User, Depends(current_user)],
    session: Annotated[AsyncSession, Depends(db_helper.session_getter)],
    item_in: PlanItemCreate
):
    return await crud.create_plan_item(
        session=session,
        item_in=item_in,
        user_id=user.id
    )

@router.put("/{plan_item_id}/")
async def update_plan_item(
    plan_item_id: int,
    user: Annotated[User, Depends(current_user)],
    session: Annotated[AsyncSession, Depends(db_helper.session_getter)],
    item_update: PlanItemUpdate,
):
    item = await crud.get_plan_item(
        session=session,
        item_id=plan_item_id,
        user_id=user.id
    )

    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"PlanItem с ID {plan_item_id} не найден"
        )

    if item.user_id != user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="У вас нет прав для обновления этого элемента"
        )
    updated_item = await crud.update_plan_item(
        user_id=user.id,
        session=session,
        item=item,
        item_update=item_update
    )
    return updated_item

@router.put("/{plan_item_id}/")
async def update_plan_partial(
    plan_item_id: int,
    user: Annotated[User, Depends(current_user)],
    session: Annotated[AsyncSession, Depends(db_helper.session_getter)],
    item_update: PlanItemUpdatePartial,
):
    item = await crud.get_plan_item(
        session=session,
        item_id=plan_item_id,
        user_id=user.id
    )

    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"PlanItem с ID {plan_item_id} не найден"
        )

    if item.user_id != user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="У вас нет прав для обновления этого элемента"
        )
    updated_item = await crud.update_plan_item(
        user_id=user.id,
        session=session,
        item=item,
        item_update=item_update,
        partial=True
    )
    return updated_item

@router.delete("/{plan_item_id}/")
async def delete_plan_item(
    plan_item_id: int,
    user: Annotated[User, Depends(current_user)],
    session: Annotated[AsyncSession, Depends(db_helper.session_getter)],
):
    item = await crud.get_plan_item(
        session=session,
        item_id=plan_item_id,
        user_id=user.id
    )

    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"PlanItem с ID {plan_item_id} не найден"
        )

    if item.user_id != user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="У вас нет прав для удаления этого элемента"
        )
    
    deleted_item = await crud.delete_plan_item(
        user_id=user.id,
        session=session,
        item=item,
    )
    return f"Запись удалена{deleted_item}"