import React, { useState } from 'react';

interface TaskFormProps {
  onSubmit: (taskName: string) => void;
  initialValue?: string;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, initialValue = '' }) => {
  const [taskName, setTaskName] = useState(initialValue);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTaskName(e.target.value)}
      />
      <button type="submit">Save Task</button>
    </form>
  );
};

export default TaskForm;