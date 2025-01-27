import React, { useState } from 'react';

interface TaskFormProps {
  onSubmit: (taskName: string) => void;
  initialValue?: string; // Optional initialValue prop
  disabled?: boolean; // Add disabled prop
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, initialValue = '', disabled = false }) => {
  const [taskName, setTaskName] = useState(initialValue); // Use initialValue to set the initial state

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(taskName);
    setTaskName(''); // Clear the input after submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Enter task name"
        disabled={disabled} // Disable input when loading
      />
      <button type="submit" disabled={disabled}> {/* Disable button when loading */}
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;