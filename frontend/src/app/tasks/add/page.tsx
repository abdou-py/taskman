'use client';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../../store/taskSlice';
import TaskForm from '../TaskForm';
import { AppDispatch } from '../../store'; // Import AppDispatch from your store

interface Task {
  id: number;
  title: string;
  description: string;
  is_completed: boolean;
}

const AddTask: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>(); // Use AppDispatch for proper typing
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddTask = async (taskName: string) => {
    if (!taskName.trim()) {
      setError('Task name cannot be empty');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const newTask: Task = {
        id: Date.now(), // Temporary ID (will be replaced by the backend)
        title: taskName,
        description: '',
        is_completed : false
      };

      // Dispatch the addTask action and unwrap the result
      await dispatch(addTask(newTask)).unwrap();

      // Clear the form or show a success message
      alert('Task added successfully!');
    } catch (err) {
      // Handle the error explicitly
      if (err instanceof Error) {
        setError(err.message || 'Failed to add task. Please try again.');
      } else {
        setError('Failed to add task. Please try again.');
      }
      console.error('Error adding task:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Add New Task</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <TaskForm onSubmit={handleAddTask} disabled={loading} />
      {loading && <p>Adding task...</p>}
    </div>
  );
};

export default AddTask;