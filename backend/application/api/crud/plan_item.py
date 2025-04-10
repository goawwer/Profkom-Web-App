from sqlalchemy import select, Result
from sqlalchemy.ext.asyncio import AsyncSession
from core.schemas.plan_item import PlanItemCreate, PlanItemUpdate, PlanItemUpdatePartial
from core.models import PlanItem

async def get_plan_items(session: AsyncSession, user_id: int) -> list[PlanItem]:
  stmt = select(PlanItem).where(PlanItem.user_id == user_id).order_by(PlanItem.start_time)
  result: Result = await session.execute(stmt)
  items = result.scalars().all()
  return list(items)

async def get_plan_item(session: AsyncSession, item_id: int, user_id: int) -> PlanItem | None:
  stmt = select(PlanItem).where(PlanItem.id == item_id, PlanItem.user_id == user_id)
  result = await session.execute(stmt)
  return result.scalars().first()

async def create_plan_item(session: AsyncSession, item_in: PlanItemCreate, user_id: int) -> PlanItem:
  item = PlanItem(**item_in.model_dump(), user_id = user_id)
  session.add(item)
  await session.commit()
  await session.refresh(item)
  return item 

async def update_plan_item(
    user_id: int,
    session: AsyncSession,
    item: PlanItem,
    item_update: PlanItemUpdate | PlanItemUpdatePartial,
    partial: bool = False
) -> PlanItem:
  dump_kwargs = {"exclude_unset": partial}
  for name, value in item_update.model_dump(**dump_kwargs).items():
    setattr (item, name, value)
  await session.commit()
  return item 
async def delete_plan_item(
    user_id: int,
    session: AsyncSession,
    item: PlanItem
) -> None:
  await session.delete(item)
  await session.commit()