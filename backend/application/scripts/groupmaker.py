import asyncio
from core.models import db_helper, Group
from sqlalchemy import select


default_groups = [
    "АИС-22-1",
    "ИВТ-22-1",
    "ПИЭ-22-1",
]

async def create_group(group_name: str, session):
    try:
        group_query = select(Group).where(Group.name == group_name)
        result = await session.execute(group_query)
        group = result.scalar_one_or_none()

        if group:
            return group

        group = Group(name=group_name)
        session.add(group)
        await session.commit()
        await session.refresh(group)
        return group

    except Exception as e:
        raise

async def create_groups(groups: list[str] = default_groups):
    async with db_helper.session_factory() as session:
        for group_name in groups:
            await create_group(group_name, session)

if __name__ == "__main__":
    asyncio.run(create_groups())
