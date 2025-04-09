from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, Result
from core.models import Group
from core.schemas.group import GroupCreate

async def get_all_groups(session: AsyncSession) -> list[Group]:
  stmt = select(Group).order_by(Group.id)
  result: Result = await session.execute(stmt)
  groups = result.scalars().all()
  return list(groups)

async def get_group_by_id(session: AsyncSession, group_id: int) -> Group | None:
  return await session.get(Group, group_id)
  
async def get_group_by_name(session: AsyncSession, group_name: str) -> Group | None:
  stmt = select(Group).where(Group.name == group_name)
  result: Result = await session.execute(stmt)
  group = result.scalars().one_or_none()
  return group

async def create_group(session: AsyncSession, group_in: GroupCreate) -> Group:
  group = Group(**group_in.model_dump())
  session.add(group)
  await session.commit()
  await session.refresh(group)
  return group 
