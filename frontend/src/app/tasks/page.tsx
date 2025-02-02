'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks, removeTask, addTask, updateTask } from '../store/taskSlice';
import { Typography, Grid, Checkbox, Button, Box, CircularProgress, TextField, Snackbar } from '@mui/material';
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
  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleDelete = useCallback(
    (id: number) => {
      dispatch(removeTask(id)).then(() => dispatch(fetchTasks()));
    },
    [dispatch]
  );

  const handleDeleteSelected = useCallback(() => {
    selectedTasks.forEach((id) => dispatch(removeTask(id)));
    setSelectedTasks([]);
    setSuccessMessage('Selected tasks deleted successfully');
  }, [dispatch, selectedTasks]);

  const handleAddTask = useCallback(() => {
    if (!newTitle.trim()) {
      alert('Title is required');
      return;
    }

    const newTask = { 
      title: newTitle, 
      description: newDescription || 'No description provided',
      is_completed: false,
    };

    dispatch(addTask(newTask)).then(() => dispatch(fetchTasks()));
    setNewTitle('');
    setNewDescription('');
    setShowForm(false);
    setSuccessMessage('Task added successfully');
  }, [dispatch, newTitle, newDescription]);

  const handleUpdateTask = useCallback(() => {
    if (!editTaskId || !newTitle.trim()) return;

    dispatch(updateTask({ idtask: editTaskId, updates: { title: newTitle, description: newDescription } }))
      .then(() => dispatch(fetchTasks()));
    setEditTaskId(null);
    setNewTitle('');
    setNewDescription('');
    setShowForm(false);
    setSuccessMessage('Task updated successfully');
  }, [dispatch, editTaskId, newTitle, newDescription]);

  const handleEditClick = useCallback((task: any) => {
    setEditTaskId(task.idtask);
    setNewTitle(task.title);
    setNewDescription(task.description);
    setShowForm(true);
  }, []);

  const handleCheckboxChange = useCallback((id: number) => {
    setSelectedTasks((prev) =>
      prev.includes(id) ? prev.filter((taskId) => taskId !== id) : [...prev, id]
    );
  }, []);

  return (
    <PageContainer title="Task List" description="Manage your tasks">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <DashboardCard title="Task Management">
              <Box>
                <Box display="flex" gap={2} sx={{ mb: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setShowForm(true)}
                    disabled={showForm}
                  >
                    {editTaskId ? 'Edit Task' : 'Add Task'}
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
                      <Button variant="contained" color="primary" onClick={editTaskId ? handleUpdateTask : handleAddTask}>
                        {editTaskId ? 'Update Task' : 'Save Task'}
                      </Button>
                    </Box>
                  </Box>
                )}
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
                              />
                              <Button
                                variant="outlined"
                                color="primary"
                                onClick={() => handleEditClick(task)}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="outlined"
                                color="error"
                                onClick={() => handleDelete(task.idtask)}
                              >
                                Delete
                              </Button>
                            </Box>
                            <Typography variant="body2" sx={{ mt: 1 }}>
                              {task.description || 'No description available'}
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
                <Snackbar
                  open={!!successMessage}
                  autoHideDuration={3000}
                  onClose={() => setSuccessMessage(null)}
                  message={successMessage}
                />
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
