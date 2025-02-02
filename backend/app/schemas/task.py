from datetime import datetime
from pydantic import BaseModel, ConfigDict
from typing import Optional

class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    is_completed: Optional[bool] = False

    # Pydantic V2 config
    model_config = ConfigDict(from_attributes=True)

class TaskCreate(TaskBase):
    pass

class TaskUpdate(TaskBase):
    title: Optional[str] = None
    description: Optional[str] = None
    is_completed: Optional[bool] = None

class TaskSchema(TaskBase):
    idtask: int
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    # Pydantic V2 config
    model_config = ConfigDict(from_attributes=True)