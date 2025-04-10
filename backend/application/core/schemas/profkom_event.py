from pydantic import BaseModel, ConfigDict
from datetime import datetime
from typing import Optional

DATETIME_FORMAT = "%d-%m-%Y %H:%M:%S"  # "DD-MM-YYYY HH:MM:SS"

class ProfkomEventBase(BaseModel):
    title: str
    description: str
    start_time: Optional[datetime] = None
    end_time: Optional[datetime] = None
    location: str

class ProfkomEventCreate(ProfkomEventBase):
    pass  

class ProfkomEventUpdate(ProfkomEventBase):
    title: Optional[str] = None 
    description: Optional[str] = None
    start_time: Optional[datetime] = None
    end_time: Optional[datetime] = None
    location: Optional[str] = None

class ProfkomEventUpdatePartial(ProfkomEventBase):
    title: Optional[str] = None
    description: Optional[str] = None
    start_time: Optional[datetime] = None
    end_time: Optional[datetime] = None

class ProfkomEvent(ProfkomEventBase):
    model_config = ConfigDict(
        from_attributes=True,
        json_encoders={
            datetime: lambda v: v.strftime(DATETIME_FORMAT) if v else None
        }
    )
    id: int
    user_id: int