from sqlalchemy import select, Result
from sqlalchemy.ext.asyncio import AsyncSession
from core.models import ProfkomEvent, db_helper
from core.schemas.profkom_event import ProfkomEventCreate, ProfkomEventUpdate, ProfkomEventUpdatePartial

async def get_events(session: AsyncSession) -> list[ProfkomEvent] | None:
  stmt = select(ProfkomEvent).order_by(ProfkomEvent.start_time)
  result: Result = await session.execute(stmt)
  events = result.scalars().all()
  return list(events)

async def get_event(session: AsyncSession, event_id: int) -> ProfkomEvent | None: 
  return await session.get(ProfkomEvent, event_id)

async def create_event(session: AsyncSession, user_id: int, event_in: ProfkomEventCreate) -> ProfkomEvent:
  event = ProfkomEvent(**event_in.model_dump(), user_id = user_id)
  session.add(event)
  await session.commit()
  await session.refresh(event)
  return event

async def update_event(
    user_id: int,
    session: AsyncSession,
    event: ProfkomEvent,
    event_update: ProfkomEventUpdate | ProfkomEventUpdatePartial,
    partial: bool = False
) -> ProfkomEvent:
  dump_kwargs = {"exclude_unset": partial}
  for name, value in event_update.model_dump(**dump_kwargs).items():
    setattr (event, name, value)
  await session.commit()
  return event

async def delete_event(
    user_id: int,
    session: AsyncSession,
    event: ProfkomEvent
) -> None: 
  await session.delete(event)
  await session.commit()