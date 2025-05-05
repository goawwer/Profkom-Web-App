from pydantic import BaseModel
from typing import Optional
from datetime import date

class ScheduleItemOut(BaseModel):
    date: date
    week_day: str
    pair_number: int
    time: str
    subject: str
    teacher: str
    room: str
    comment: Optional[str]
