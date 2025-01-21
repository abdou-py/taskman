from pydantic import BaseModel

class TaskBase(BaseModel):
    title: str
    description: str | None = None
    is_completed: bool = False

class TaskCreate(TaskBase):
    pass

class Task(TaskBase):
    idtask: int

    class Config:
        orm_mode = True
