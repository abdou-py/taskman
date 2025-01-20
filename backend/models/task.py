# backend/app/models/task.py
from sqlalchemy import Column, Integer, String, Boolean
from app.database.connection import Base

class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String)
    is_completed = Column(Boolean, default=False)

# backend/app/schemas/task.py
from pydantic import BaseModel

class TaskBase(BaseModel):
    title: str
    description: str | None = None
    is_completed: bool = False

class TaskCreate(TaskBase):
    pass

class Task(TaskBase):
    id: int

    class Config:
        orm_mode = True