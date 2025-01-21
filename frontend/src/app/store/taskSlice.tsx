import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Task {
  id: number;
  name: string;
  completed?: boolean;
}

const initialState: { tasks: Task[]; loading: boolean; error: string | null } = {
  tasks: [],
  loading: false,
  error: null,
};

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await axios.get('http://localhost:8000/tasks');
  return response.data;
});

export const addTask = createAsyncThunk('tasks/addTask', async (task: Omit<Task, 'id'>) => {
  const response = await axios.post('http://localhost:8000/tasks', task);
  return response.data;
});

export const removeTask = createAsyncThunk('tasks/removeTask', async (id: number) => {
  await axios.delete(`http://localhost:8000/tasks/${id}`);
  return id;
});

export const updateTask = createAsyncThunk('tasks/updateTask', async (payload: { id: number; updates: Partial<Task> }) => {
  const { id, updates } = payload;
  const response = await axios.patch(`http://localhost:8000/tasks/${id}`, updates);
  return response.data;
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch tasks';
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex((task) => task.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      });
  },
});

export default taskSlice.reducer;
