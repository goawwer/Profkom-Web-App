from sqlalchemy.ext.asyncio import AsyncSession
from core.models.access_token import AccessToken
from core.schemas.user import UserRead
from sqlalchemy import select, Result, desc

async def get_token(
    session: AsyncSession,
    user: UserRead,
) -> AccessToken | None: 
  stmt = select(AccessToken).where(AccessToken.user_id == user.id).order_by(desc(AccessToken.created_at)).limit(1)
  result: Result = await session.execute(stmt)
  token = result.scalar_one_or_none()
  return token 