'use client';

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks, removeTask, addTask } from '../store/taskSlice';
import { Typography, Grid, CardContent, Checkbox, Button, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import BlankCard from '@/app/(DashboardLayout)/components/shared/BlankCard';

import { Provider } from "react-redux"; // Import Provider
import store from "@/app/store"; // Import the Redux store

const TaskListContent: React.FC = () => {
  const { tasks, loading, error } = useSelector((state: any) => state.tasks); // Use selector to fetch state
  const dispatch = useDispatch(); // Dispatch actions
  const [selectedTasks, setSelectedTasks] = useState<number[]>([]); // Track selected tasks

  useEffect(() => {
    dispatch(fetchTasks()); // Fetch tasks on mount
  }, [dispatch]);

  const handleDelete = (id: number) => {
    dispatch(removeTask(id)); // Remove task
  };

  const handleAddTask = () => {
    const newTask = { name: `New Task ${tasks.length + 1}` }; // Create a new task
    dispatch(addTask(newTask)); // Dispatch add task action
  };

  const handleCheckboxChange = (id: number) => {
    setSelectedTasks((prev) =>
      prev.includes(id) ? prev.filter((taskId) => taskId !== id) : [...prev, id]
    ); // Toggle selection
  };

  const handleDeleteSelected = () => {
    selectedTasks.forEach((id) => handleDelete(id)); // Delete all selected tasks
    setSelectedTasks([]); // Clear selection
  };

  return (
    <PageContainer title="Task List" description="Manage your tasks">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <DashboardCard title="Task Management">
            <Box mb={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddTask}
                sx={{ marginRight: 2 }}
              >
                Add Task
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleDeleteSelected}
                disabled={selectedTasks.length === 0}
              >
                Delete Selected
              </Button>
            </Box>
            {loading && <Typography>Loading tasks...</Typography>}
            {error && (
              <Typography color="error" variant="body1">
                {error}
              </Typography>
            )}
            <Grid container spacing={3}>
              {tasks.map((task) => (
  <Grid item xs={12} sm={6} md={4} key={task.idtask }> 
    <BlankCard>
      <CardContent>
        <Box display="flex" alignItems="center">
          <Checkbox
            checked={selectedTasks.includes(task.idtask )}
            onChange={() => handleCheckboxChange(task.idtask )}
            color="primary"
          />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {task.title}
          </Typography>
          <Button
            variant="outlined"
            color="error"
            onClick={() => handleDelete(task.idtask )}
          >
            Delete
          </Button>
        </Box>
      </CardContent>
    </BlankCard>
  </Grid>
))}

            </Grid>
          </DashboardCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

// Wrap TaskListContent in Provider
const TaskList: React.FC = () => {
  return (
    <Provider store={store}>
      <TaskListContent />
    </Provider>
  );
};

export default TaskList;
