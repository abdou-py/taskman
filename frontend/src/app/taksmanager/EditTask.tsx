import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import { updateTask } from '../store/taskSlice';

interface Task {
  id: number;
  name: string;
}

const EditTask: React.FC = () => {
  const { taskId } = useParams<{ taskId: string }>(); // Type parameter for specificity
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const tasks = useSelector((state) => state.tasks) as Task[]; // Type assertion for tasks
  const task = tasks.find((t) => t.id === Number(taskId));

  const handleEditTask = (updatedTaskName: string) => {
    if (!task) return; // Handle potential missing task

    const updatedTask: Task = { ...task, name: updatedTaskName };
    dispatch(updateTask(updatedTask));
    navigate('/tasks');
  };

  return (
    <div>
      <h1>Edit Task</h1>
      {task ? (
        <TaskForm onSubmit={handleEditTask} initialValue={task.name} />
      ) : (
        <p>Task not found!</p>
      )}
    </div>
  );
};

export default EditTask;