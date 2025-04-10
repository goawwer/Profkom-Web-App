from pydantic import BaseModel, ConfigDict
from datetime import datetime
from typing import Optional

DATETIME_FORMAT = "%d-%m-%Y %H:%M:%S"  # "DD-MM-YYYY HH:MM:SS"

class NoteBase(BaseModel):
  title: Optional[str] = None
  text: str
  created_at: datetime
  is_important: bool = False

class NoteCreate(NoteBase):
  pass

class NoteUpdate(BaseModel):
  title: Optional[str] = None
  text: Optional[str] = None
  is_important: Optional[bool] = False

class NoteUpdatePartial(BaseModel):
  title: Optional[str] = None
  text: Optional[str] = None
  is_important: Optional[bool] = False

class Note(NoteBase):
  model_config = ConfigDict(
        from_attributes=True,
        json_encoders={
            datetime: lambda v: v.strftime(DATETIME_FORMAT) if v else None
        }
    )
  id: int
  user_id: int  