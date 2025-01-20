import React from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../store/taskSlice';
import TaskForm from '../components/TaskForm';

const AddTask = () => {
  const dispatch = useDispatch();

  const handleAddTask = (taskName) => {
    const newTask = {
      id: Date.now(),
      name: taskName,
    };
    dispatch(addTask(newTask));
  };

  return (
    <div>
      <h1>Add New Task</h1>
      <TaskForm onSubmit={handleAddTask} />
    </div>
  );
};

export default AddTask;