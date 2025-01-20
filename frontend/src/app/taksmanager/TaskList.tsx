import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeTask, deleteMultipleTasks } from '../store/taskSlice'; // Update import

interface Task {
  id: number;
  name: string;
}

const TaskList: React.FC = () => {
  const tasks = useSelector((state) => state.tasks as Task[]) as Task[]; // Type assertion for tasks
  const dispatch = useDispatch();
  const [selectedTasks, setSelectedTasks] = useState<number[]>([]);

  const handleDelete = (id: number) => {
    dispatch(removeTask(id)); // Update action creator
  };

  const handleCheckboxChange = (id: number) => {
    setSelectedTasks((prev) => {
      if (prev.includes(id)) {
        return prev.filter((taskId) => taskId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleDeleteSelected = () => {
    dispatch(deleteMultipleTasks(selectedTasks));
    setSelectedTasks([]);
  };

  return (
    <div>
      <h2>Task List</h2>
      <button onClick={handleDeleteSelected} disabled={selectedTasks.length === 0}>
        Delete Selected Tasks
      </button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={selectedTasks.includes(task.id)}
              onChange={() => handleCheckboxChange(task.id)}
            />
            {task.name}
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;