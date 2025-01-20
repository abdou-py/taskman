import React, { useState } from 'react';

const TaskForm = ({ onSubmit }) => {
  const [taskName, setTaskName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskName.trim()) {
      onSubmit(taskName);
      setTaskName('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="taskName">Task Name:</label>
      <input
        type="text"
        id="taskName"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;