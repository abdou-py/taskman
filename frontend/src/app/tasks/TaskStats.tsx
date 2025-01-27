import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store'; 

interface Task {
  idtask: number;
  name: string;
  completed: boolean;
}

const TaskStats: React.FC = () => {
    // Use RootState to type the state parameter
  const tasks = useSelector((state: RootState) => state.tasks.tasks); // Access tasks.tasks

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