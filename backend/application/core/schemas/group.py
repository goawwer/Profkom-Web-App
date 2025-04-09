from pydantic import BaseModel, ConfigDict

class GroupBase(BaseModel):
  name: str

class GroupCreate(GroupBase):
  pass

class GroupUpdate(GroupCreate):
  pass

class GroupUpdatePartial(GroupCreate):
  name: str | None = None

class Group(GroupBase):
  model_config = ConfigDict(
    from_attributes=True
  )
  id: int