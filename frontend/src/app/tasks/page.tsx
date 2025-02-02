'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks, removeTask, addTask } from '../store/taskSlice';
import { Typography, Grid, Checkbox, Button, Box, CircularProgress, TextField } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import { AppDispatch, RootState } from '../store';
import { Provider } from 'react-redux';
import { store } from '@/app/store';

const TaskListContent: React.FC = React.memo(function TaskListContent() {
  const { tasks, loading, error } = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch<AppDispatch>();
  const [selectedTasks, setSelectedTasks] = useState<number[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleDelete = useCallback(
    (id: number) => {
      dispatch(removeTask(id));
    },
    [dispatch]
  );

  const handleAddTask = useCallback(() => {
    if (!newTitle.trim()) {
      alert('Title is required');
      return;
    }

    const newTask = { 
      title: newTitle, 
      description: newDescription || 'No description provided',
      is_completed : false,
    };

    dispatch(addTask(newTask));
    setNewTitle('');
    setNewDescription('');
    setShowForm(false);
  }, [dispatch, newTitle, newDescription]);

  const handleCheckboxChange = useCallback((id: number) => {
    setSelectedTasks((prev) =>
      prev.includes(id) ? prev.filter((taskId) => taskId !== id) : [...prev, id]
    );
  }, []);

  const handleDeleteSelected = useCallback(() => {
    selectedTasks.forEach((id) => handleDelete(id));
    setSelectedTasks([]);
  }, [selectedTasks, handleDelete]);

  return (
    <PageContainer title="Task List" description="Manage your tasks">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <DashboardCard title="Task Management">
            <Box>
              {/* Action Buttons */}
              <Box display="flex" gap={2} sx={{ mb: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setShowForm(true)}
                  disabled={showForm}
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

              {/* Add Task Form (Shown Only When Adding a Task) */}
              {showForm && (
                <Box
                  sx={{
                    p: 2,
                    border: '1px solid #ddd',
                    borderRadius: 2,
                    mb: 2,
                    backgroundColor: '#f9f9f9',
                  }}
                >
                  <TextField
                    label="Task Title"
                    variant="outlined"
                    fullWidth
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    label="Task Description"
                    variant="outlined"
                    fullWidth
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    sx={{ mb: 2 }}
                  />
                  <Box display="flex" justifyContent="flex-end" gap={1}>
                    <Button variant="outlined" color="secondary" onClick={() => setShowForm(false)}>
                      Cancel
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleAddTask}>
                      Save Task
                    </Button>
                  </Box>
                </Box>
              )}

              {/* Loading / Error / Task List */}
              {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="100px">
                  <CircularProgress />
                </Box>
              ) : error ? (
                <Typography color="error" variant="body1" role="alert">
                  {error}
                </Typography>
              ) : tasks && tasks.length > 0 ? (
                <Grid container spacing={3}>
                  {tasks.map((task) => (
                    <Grid item xs={12} sm={6} md={4} key={task.idtask}>
                      <DashboardCard title={task.title || 'Unnamed Task'}>
                        <Box>
                          <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Checkbox
                              checked={selectedTasks.includes(task.idtask)}
                              onChange={() => handleCheckboxChange(task.idtask)}
                              color="primary"
                              inputProps={{ 'aria-label': `Select task: ${task.title || 'Unnamed Task'}` }}
                            />
                            <Button
                              variant="outlined"
                              color="error"
                              onClick={() => handleDelete(task.idtask)}
                              aria-label={`Delete task: ${task.title || 'Unnamed Task'}`}
                            >
                              Delete
                            </Button>
                          </Box>
                          <Typography variant="body2" sx={{ mt: 1 }}>
                            {task.description || 'No description available'}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            ID: {task.idtask}
                          </Typography>
                        </Box>
                      </DashboardCard>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Typography variant="body1" sx={{ textAlign: 'center', mt: 2 }}>
                  No tasks found.
                </Typography>
              )}
      </Box>
            </DashboardCard>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
});

const TaskList: React.FC = () => (
  <Provider store={store}>
    <TaskListContent />
  </Provider>
);

export default TaskList;
