from pydantic import BaseModel, ConfigDict
from datetime import datetime
from typing import Optional

DATETIME_FORMAT = "%d-%m-%Y %H:%M:%S"  # "DD-MM-YYYY HH:MM:SS"

class PlanItemBase(BaseModel):
    title: str
    description: Optional[str] = None
    start_time: Optional[datetime] = None
    end_time: Optional[datetime] = None

class PlanItemCreate(PlanItemBase):
    pass  

class PlanItemUpdate(PlanItemBase):
    title: Optional[str] = None 
    description: Optional[str] = None
    start_time: Optional[datetime] = None
    end_time: Optional[datetime] = None

class PlanItemUpdatePartial(PlanItemBase):
    title: Optional[str] = None
    description: Optional[str] = None
    start_time: Optional[datetime] = None
    end_time: Optional[datetime] = None

class PlanItem(PlanItemBase):
    model_config = ConfigDict(
        from_attributes=True,
        json_encoders={
            datetime: lambda v: v.strftime(DATETIME_FORMAT) if v else None
        }
    )
    id: int
    user_id: int  