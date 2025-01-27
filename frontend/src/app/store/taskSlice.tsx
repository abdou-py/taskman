import { createSlice, createAsyncThunk, configureStore } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the Task interface
interface Task {
  idtask: number;
  name: string;
  completed?: boolean;
}

// Define the TaskState interface
interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

// Initial state for the task slice
const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

// Fetch all tasks
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  try {
    const response = await axios.get('http://localhost:8000/tasks');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch tasks');
  }
});

// Add a new task
export const addTask = createAsyncThunk('tasks/addTask', async (task: Omit<Task, 'idtask'>) => {
  try {
    const response = await axios.post('http://localhost:8000/tasks', task);
    return response.data;
  } catch (error) {
    throw new Error('Failed to add task');
  }
});

// Remove a task
export const removeTask = createAsyncThunk('tasks/removeTask', async (idtask: number) => {
  try {
    await axios.delete(`http://localhost:8000/tasks/${idtask}`);
    return idtask;
  } catch (error) {
    throw new Error('Failed to remove task');
  }
});

// Update a task
export const updateTask = createAsyncThunk('tasks/updateTask', async (payload: { idtask: number; updates: Partial<Task> }) => {
  try {
    const { idtask, updates } = payload;
    const response = await axios.patch(`http://localhost:8000/tasks/${idtask}`, updates);
    return response.data;
  } catch (error) {
    throw new Error('Failed to update task');
  }
});

// Create the task slice
const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Tasks
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

      // Add Task
      .addCase(addTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload);
      })
      .addCase(addTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add task';
      })

      // Remove Task
      .addCase(removeTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.filter((task) => task.idtask !== action.payload);
      })
      .addCase(removeTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to remove task';
      })

      // Update Task
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.tasks.findIndex((task) => task.idtask === action.payload.idtask);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update task';
      });
  },
});

// Export the reducer
export default taskSlice.reducer;

// Create and export the store
export const store = configureStore({
  reducer: {
    tasks: taskSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;