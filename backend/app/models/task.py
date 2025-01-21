from sqlalchemy import Column, Integer, String, Boolean
from app.database.models import Base

class Task(Base):
    __tablename__ = "task"

    idtask = Column(Integer, primary_key=True, index=True)
    title = Column(String(45), nullable=False)
    description = Column(String, nullable=True)
    is_completed = Column(Boolean, default=False)
