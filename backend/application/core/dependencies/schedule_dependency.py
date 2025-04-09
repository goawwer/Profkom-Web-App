from typing import AsyncGenerator
from core.services.schedule import GroupScheduleService

async def get_schedule_service() -> AsyncGenerator[GroupScheduleService, None]:
    service = GroupScheduleService()
    try:
        yield service
    finally:
        await service.close()