import React from 'react';
import { useSelector } from 'react-redux';

interface Task {
  id: number;
  name: string;
  completed: boolean;
}

const TaskStats: React.FC = () => {
  const tasks = useSelector((state) => state.tasks) as Task[];

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;

  return (
    <div>
      <h2>Task Statistics</h2>
      <p>Total Tasks: {totalTasks}</p>
      <p>Completed Tasks: {completedTasks}</p>
    </div>
  );
};

export default TaskStats;