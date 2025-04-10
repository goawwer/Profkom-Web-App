from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from api.crud import plan_item as crud
from core.config import settings
from core.models import User, db_helper, PlanItem
from core.schemas.plan_item import PlanItemCreate, PlanItemUpdate, PlanItemUpdatePartial
from typing import Annotated
from api.dependencies.authentication.api_users import current_user
from .dependencies import get_object_dependency

router = APIRouter(
    prefix=settings.prefix.plan_item,
    tags=["Plan Items"]
)

plan_item_dep = get_object_dependency(
    cls=PlanItem,
    crud_func=crud.get_plan_item,
    path_param="plan_item_id"
)

@router.get("/all")
async def get_all_plans(
    user: Annotated[User, Depends(current_user)],
    session: Annotated[AsyncSession, Depends(db_helper.session_getter)]
):
    return await crud.get_plan_items(session=session, user_id=user.id)

@router.get("/{plan_item_id}/")
async def get_plan_item(
    item: Annotated[PlanItem, Depends(plan_item_dep)]
):
    return item
"""
@router.get("/{plan_item_name}")
async def get_plan_item_by_name(
    plan_item_name: str,
    user: Annotated[User, Depends(current_user)],
    session: Annotated[AsyncSession, Depends(db_helper.session_getter)]
):
    item = await crud.get_plan_item_by_name(session=session, item_name = plan_item_name, user_id=user.id)
    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Задача не найдена"
        )
    return item
"""


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
    item: Annotated[PlanItem, Depends(plan_item_dep)],
    session: Annotated[AsyncSession, Depends(db_helper.session_getter)],
    item_update: PlanItemUpdate
):
    return await crud.update_plan_item(
        session=session,
        item=item,
        item_update=item_update,
        partial=False
    )

@router.patch("/{plan_item_id}/")
async def partial_update_plan_item(
    item: Annotated[PlanItem, Depends(plan_item_dep)],
    session: Annotated[AsyncSession, Depends(db_helper.session_getter)],
    item_update: PlanItemUpdatePartial
):
    return await crud.update_plan_item(
        session=session,
        item=item,
        item_update=item_update,
        partial=True
    )

@router.delete("/{plan_item_id}/", status_code=status.HTTP_204_NO_CONTENT)
async def delete_plan_item(
    item: Annotated[PlanItem, Depends(plan_item_dep)],
    session: Annotated[AsyncSession, Depends(db_helper.session_getter)]
):
    await crud.delete_plan_item(session=session, item=item)
    return None