from fastapi import APIRouter, HTTPException, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import func, asc, desc
from typing import Optional, List

from app.models.task import Task  # ORM Model
from app.schemas.task import TaskSchema, TaskCreate, TaskUpdate  # Pydantic Schemas
from app.database.session import get_db

router = APIRouter(prefix="/tasks", tags=["Tasks"])

@router.post("", response_model=TaskSchema)
def create_task(task: TaskCreate, db: Session = Depends(get_db)):
    """
    Create a new task in the database.
    """
    db_task = Task(**task.dict())
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return TaskSchema.from_orm(db_task)  # Convert to Pydantic model

@router.get("", response_model=dict)
def read_tasks(
    db: Session = Depends(get_db),
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100),
    search: Optional[str] = Query(None),
    status: Optional[bool] = Query(None),
    sort_field: str = Query("idtask"),
    sort_order: str = Query("asc")
):
    """
    Retrieve paginated and filtered list of tasks with metadata
    """
    # Base query
    query = db.query(Task)

    # Apply filters
    if search:
        query = query.filter(
            (Task.title.ilike(f"%{search}%")) | 
            (Task.description.ilike(f"%{search}%"))
        )
    if status is not None:
        query = query.filter(Task.is_completed == status)

    # Validate sort field
    valid_sort_fields = [column.name for column in Task.__table__.columns]
    if sort_field not in valid_sort_fields:
        sort_field = "idtask"

    # Apply sorting
    sort_func = desc if sort_order.lower() == "desc" else asc
    query = query.order_by(sort_func(getattr(Task, sort_field)))

    # Get total count and paginated results
    total = query.count()
    tasks = query.offset(skip).limit(limit).all()

    return {
        "tasks": [TaskSchema.from_orm(task) for task in tasks],  # Convert to Pydantic models
        "total": total,
        "page": (skip // limit) + 1,
        "pageSize": limit,
        "hasMore": (skip + limit) < total
    }

@router.get("/{task_id}", response_model=TaskSchema)
def read_task(task_id: int, db: Session = Depends(get_db)):
    """
    Retrieve a single task by its ID.
    """
    task = db.query(Task).filter(Task.idtask == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return TaskSchema.from_orm(task)  # Convert to Pydantic model

@router.put("/{task_id}", response_model=TaskSchema)
def update_task(task_id: int, task_update: TaskUpdate, db: Session = Depends(get_db)):
    """
    Update an existing task by its ID with partial data
    """
    db_task = db.query(Task).filter(Task.idtask == task_id).first()
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    update_data = task_update.dict(exclude_unset=True)
    
    for key, value in update_data.items():
        setattr(db_task, key, value)
    
    db.commit()
    db.refresh(db_task)
    return TaskSchema.from_orm(db_task)  # Convert to Pydantic model

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