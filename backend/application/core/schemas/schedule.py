from pydantic import BaseModel
from typing import List
from core.models.schedule import ScheduleEntry, Pair, DaySchedule

class ScheduleEntrySchema(ScheduleEntry):
    pass

class PairSchema(Pair):
    schedulePairs: List[ScheduleEntrySchema]

class DayScheduleSchema(DaySchedule):
    pairs: List[PairSchema]