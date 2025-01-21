from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session

from app.models.task import Task  # ORM Model
from app.schemas.task import Task as TaskSchema, TaskCreate  # Pydantic Schemas
from app.database.session import get_db

router = APIRouter(prefix="/tasks", tags=["Tasks"])

@router.post("", response_model=TaskSchema)  # Removed trailing slash
def create_task(task: TaskCreate, db: Session = Depends(get_db)):
    """
    Create a new task in the database.
    """
    db_task = Task(**task.dict())
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

@router.get("", response_model=list[TaskSchema])  # Removed trailing slash
def read_tasks(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    """
    Retrieve a list of tasks, with optional pagination.
    """
    return db.query(Task).offset(skip).limit(limit).all()

@router.get("/{task_id}", response_model=TaskSchema)
def read_task(task_id: int, db: Session = Depends(get_db)):
    """
    Retrieve a single task by its ID.
    """
    task = db.query(Task).filter(Task.idtask == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@router.put("/{task_id}", response_model=TaskSchema)
def update_task(task_id: int, task: TaskCreate, db: Session = Depends(get_db)):
    """
    Update an existing task by its ID.
    """
    db_task = db.query(Task).filter(Task.idtask == task_id).first()
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    db_task.title = task.title
    db_task.description = task.description
    db_task.is_completed = task.is_completed
    db.commit()
    db.refresh(db_task)
    return db_task

@router.delete("/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db)):
    """
    Delete a task by its ID.
    """
    task = db.query(Task).filter(Task.idtask == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    db.delete(task)
    db.commit()
    return {"message": "Task deleted successfully"}
