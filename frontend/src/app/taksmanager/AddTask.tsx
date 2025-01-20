import React from 'react';
import { useDispatch } from 'react-redux';
import { AddTask } from '../store/taskSlice'; // Assuming correct import path
import TaskForm from '../components/TaskForm';

interface Task {
  id: number;
  name: string;
}

const AddTask: React.FC = () => {
  const dispatch = useDispatch();

  const handleAddTask = (taskName: string) => {
    const newTask: Task = {
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