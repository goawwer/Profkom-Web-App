from sqlalchemy import select, Result
from sqlalchemy.ext.asyncio import AsyncSession
from core.models import Note, db_helper
from core.schemas.note import NoteCreate, NoteUpdate, NoteUpdatePartial

async def get_notes(session: AsyncSession, user_id: int) -> list[Note] | None:
  stmt = select(Note).where(Note.user_id == user_id).order_by(Note.created_at)
  result: Result = await session.execute(stmt)
  notes = result.scalars().all()
  return list(notes)

async def get_note(session: AsyncSession, note_id: int, user_id) -> Note | None: 
  stmt = select(Note).where(Note.id == note_id, Note.user_id == user_id)
  result = await session.execute(stmt)
  return result.scalars().first()

async def create_note(session: AsyncSession, user_id: int, note_in: NoteCreate) -> Note:
  note = Note(**note_in.model_dump(), user_id = user_id)
  session.add(note)
  await session.commit()
  await session.refresh(note)
  return note

async def update_note(
    user_id: int,
    session: AsyncSession,
    note: Note,
    note_update: NoteUpdate | NoteUpdatePartial,
    partial: bool = False
) -> Note:
  dump_kwargs = {"exclude_unset": partial}
  for name, value in note_update.model_dump(**dump_kwargs).items():
    setattr (note, name, value)
  await session.commit()
  return note

async def delete_note(
    user_id: int,
    session: AsyncSession,
    note: Note
) -> None: 
  await session.delete(note)
  await session.commit()