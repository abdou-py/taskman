'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  fetchTasks, 
  removeTask, 
  addTask, 
  setSearchQuery, 
  setStatusFilter, 
  setSort, 
  resetPagination 
} from '@/app/store/taskSlice';
import {
  Typography,
  Grid,
  Checkbox,
  Button,
  Box,
  CircularProgress,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Card,
  CardContent,
  List,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Chip,
  Snackbar,
  Alert
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as UncheckedIcon,
  Close as CloseIcon,
  Refresh as RefreshIcon,
  FilterList as FilterIcon,
  Sort as SortIcon
} from '@mui/icons-material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import { Provider } from 'react-redux';
import { store, AppDispatch, RootState } from '@/app/store';

const TaskListContent: React.FC = React.memo(function TaskListContent() {
  const { 
    tasks, 
    loading, 
    error, 
    hasMore, 
    pageSize,
    searchQuery,
    statusFilter,
    sortField,
    sortOrder
  } = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch<AppDispatch>();
  const [selectedTasks, setSelectedTasks] = useState<number[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success'|'error'>('success');

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch, searchQuery, statusFilter, sortField, sortOrder]);


const handleAddTask = useCallback(() => {
  if (!newTitle.trim()) {
    showError('Title is required');
    return;
  }

  dispatch(addTask({ title: newTitle, is_completed: false, description: newDescription }))
    .unwrap()
    .then(() => {
      setNewTitle('');
      setNewDescription('');
      setOpenDialog(false);
      showSuccess('Task added successfully');
      // Refresh the task list immediately after adding
      dispatch(resetPagination());
      dispatch(fetchTasks());
    })
    .catch(() => showError('Failed to add task'));
}, [dispatch, newTitle, newDescription]);

const handleDelete = useCallback(
  (id: number) => {
    dispatch(removeTask(id))
      .unwrap()
      .then(() => {
        showSuccess('Task deleted successfully');
        // Refresh the task list immediately after deleting
        dispatch(resetPagination());
        dispatch(fetchTasks());
      })
      .catch(() => showError('Failed to delete task'));
  },
  [dispatch]
);

  const handleLoadMore = () => {
    dispatch(fetchTasks());
  };

  const showSuccess = (message: string) => {
    setSnackbarSeverity('success');
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const showError = (message: string) => {
    setSnackbarSeverity('error');
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

    const handleCheckboxChange = (id: number) => {
    setSelectedTasks((prevSelectedTasks) => {
      const isSelected = prevSelectedTasks.includes(id);
      if (isSelected) {
        return prevSelectedTasks.filter((taskId) => taskId !== id);
      } else {
        return [...prevSelectedTasks, id];
      }
    });
  };


  return (
    <PageContainer title="Task List" description="Manage your tasks">
      <Box>
        {/* Floating Action Button */}
        <Box sx={{ position: 'fixed', bottom: 24, right: 24, zIndex: 1000 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => setOpenDialog(true)}
            sx={{ borderRadius: 28, boxShadow: 4 }}
          >
            Add Task
          </Button>
        </Box>

        {/* Add Task Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Create New Task
            <IconButton onClick={() => setOpenDialog(false)}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{ minWidth: 400 }}>
            <TextField
              autoFocus
              margin="dense"
              label="Task Title"
              fullWidth
              required
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              label="Description"
              multiline
              rows={4}
              fullWidth
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleAddTask}>Create Task</Button>
          </DialogActions>
        </Dialog>

        {/* Main Content */}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <DashboardCard 
              title="My Tasks" 
              action={
                <Box display="flex" gap={2}>
                  <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Search tasks..."
                    value={searchQuery}
                    onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                    sx={{ width: 200 }}
                  />
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={statusFilter ?? ''}
                      label="Status"
                      onChange={(e) => dispatch(setStatusFilter(e.target.value as boolean | null))}
                    >
                      <MenuItem value="">All</MenuItem>
                      <MenuItem value="true">Completed</MenuItem>
                      <MenuItem value="false">Pending</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel>Sort By</InputLabel>
                    <Select
                      value={sortField}
                      label="Sort By"
                      onChange={(e) => dispatch(setSort({
                        field: e.target.value,
                        order: sortOrder
                      }))}
                    >
                      <MenuItem value="title">Title</MenuItem>
                      <MenuItem value="created_at">Date</MenuItem>
                      <MenuItem value="is_completed">Status</MenuItem>
                    </Select>
                  </FormControl>
                  <IconButton onClick={() => dispatch(resetPagination())}>
                    <RefreshIcon />
                  </IconButton>
                </Box>
              }
            >
              {loading && tasks.length === 0 ? (
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                  <CircularProgress />
                </Box>
              ) : error ? (
                <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>
              ) : tasks.length > 0 ? (
                <>
                  <List sx={{ width: '100%' }}>
                    {tasks.map((task) => (
                      <Card 
                        key={task.idtask}
                        sx={{ 
                          mb: 1,
                          backgroundColor: selectedTasks.includes(task.idtask) ? '#f5f5f5' : 'inherit',
                          transition: 'background-color 0.2s',
                          '&:hover': { boxShadow: 2 }
                        }}
                      >
                        <CardContent>
                          <Box display="flex" alignItems="center">
                            <Checkbox
                              checked={selectedTasks.includes(task.idtask)}
                              onChange={() => handleCheckboxChange(task.idtask)}
                              icon={<UncheckedIcon />}
                              checkedIcon={<CheckCircleIcon color="primary" />}
                            />
                            <Box sx={{ flexGrow: 1, ml: 2 }}>
                              <Typography variant="h6" component="div">
                                {task.title}
                                {task.created_at && (
                                  <Typography variant="caption" color="text.secondary" sx={{ ml: 2 }}>
                                    {new Date(task.created_at).toLocaleDateString()}
                                  </Typography>
                                )}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {task.description || 'No description'}
                              </Typography>
                              <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                                <Chip 
                                  label={task.is_completed ? 'Completed' : 'Pending'} 
                                  size="small" 
                                  color={task.is_completed ? 'success' : 'warning'} 
                                />
                              </Box>
                            </Box>
                            <IconButton 
                              edge="end" 
                              aria-label="delete"
                              onClick={() => handleDelete(task.idtask)}
                              color="error"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Box>
                        </CardContent>
                      </Card>
                    ))}
                  </List>
                  {hasMore && (
                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                      <Button
                        variant="outlined"
                        onClick={handleLoadMore}
                        disabled={loading}
                        startIcon={loading ? <CircularProgress size={20} /> : null}
                      >
                        {loading ? 'Loading...' : `Load More (${pageSize})`}
                      </Button>
                    </Box>
                  )}
                </>
              ) : (
                <Box sx={{ 
                  textAlign: 'center', 
                  p: 4,
                  background: 'linear-gradient(45deg, #f5f5f5 30%, #ffffff 90%)',
                  borderRadius: 2
                }}>
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    No tasks found
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Click the + Add Task button to create your first task
                  </Typography>
                </Box>
              )}
            </DashboardCard>
          </Grid>
        </Grid>

        {/* Snackbar Notifications */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert 
            onClose={() => setSnackbarOpen(false)} 
            severity={snackbarSeverity}
            sx={{ width: '100%' }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
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