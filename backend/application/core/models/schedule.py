from pydantic import BaseModel
from typing import List


class ScheduleEntry(BaseModel):
    subject: str
    teacher: str
    group: str
    aud: str
    comm: str


class Pair(BaseModel):
    N: int                     
    time: str                   
    isCurrentPair: bool        
    schedulePairs: List[ScheduleEntry]  


class DaySchedule(BaseModel):
    date: str                  
    weekDay: str                
    isCurrentDate: bool         
    pairs: List[Pair]         
