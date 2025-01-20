import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import { updateTask } from '../store/taskSlice';

const EditTask = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const task = useSelector((state) => state.tasks.find((t) => t.id === Number(taskId)));

  const handleEditTask = (updatedTaskName) => {
    const updatedTask = { ...task, name: updatedTaskName };
    dispatch(updateTask(updatedTask));
    navigate('/tasks');
  };

  if (!task) {
    return <p>Task not found!</p>;
  }

  return (
    <div>
      <h1>Edit Task</h1>
      <TaskForm onSubmit={handleEditTask} initialValue={task.name} />
    </div>
  );
};

export default EditTask;