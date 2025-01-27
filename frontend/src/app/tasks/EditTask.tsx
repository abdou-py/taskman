import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { updateTask } from '../store/taskSlice';
import TaskForm from './TaskForm';
import { RootState, AppDispatch } from '../store'; // Import RootState and AppDispatch

interface Task {
  idtask: number;
  name: string;
}

const EditTask: React.FC = () => {
  const { idtask } = useParams<{ idtask: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>(); // Use AppDispatch for proper typing

  // Use RootState to type the state parameter
  const tasks = useSelector((state: RootState) => state.tasks.tasks); // Access tasks.tasks
  const task = tasks.find((t) => t.idtask === Number(idtask));

  const [taskName, setTaskName] = useState(task?.name || '');

  useEffect(() => {
    if (!task) {
      navigate('/'); // Redirect if task is not found
    }
  }, [task, navigate]);

  const handleEditTask = (updatedTaskName: string) => {
    if (task) {
      dispatch(
        updateTask({
          idtask: task.idtask,
          updates: { name: updatedTaskName },
        })
      );
      navigate('/'); // Redirect after updating
    }
  };

  if (!task) {
    return <div>Task not found</div>;
  }

  return (
    <div>
      <h1>Edit Task</h1>
      <TaskForm onSubmit={handleEditTask} initialValue={taskName} />
    </div>
  );
};

export default EditTask;