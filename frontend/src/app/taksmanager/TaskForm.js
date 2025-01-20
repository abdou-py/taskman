import React, { useState } from 'react';

const TaskForm = ({ onSubmit, initialValue = '' }) => {
  const [taskName, setTaskName] = useState(initialValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskName.trim()) {
      onSubmit(taskName);
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
      <button type="submit">Save Task</button>
    </form>
  );
};

export default TaskForm;