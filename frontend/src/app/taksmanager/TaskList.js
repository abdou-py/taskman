import React from 'react';
import { useSelector } from 'react-redux';

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks.tasks);

  return (
    <div>
      <h2>Task List</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;