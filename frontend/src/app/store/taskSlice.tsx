import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000',
});

interface Task {
  idtask: number;
  title: string;
  description: string;
  is_completed: boolean;
  created_at?: string;
}

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalTasks: number;
  hasMore: boolean;
  pageSize: number;
  searchQuery: string;
  statusFilter: boolean | null;
  sortField: string;
  sortOrder: 'asc' | 'desc';
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
  currentPage: 0,
  totalTasks: 0,
  hasMore: true,
  pageSize: 10,
  searchQuery: '',
  statusFilter: null,
  sortField: 'idtask',
  sortOrder: 'asc',
};

export const fetchTasks = createAsyncThunk<
  { tasks: Task[]; total: number },
  void,
  { rejectValue: string; state: { tasks: TaskState } }
>(
  'tasks/fetchTasks',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { tasks } = getState();
      const response = await api.get('/tasks', {
        params: {
          skip: tasks.currentPage * tasks.pageSize,
          limit: tasks.pageSize,
          search: tasks.searchQuery,
          status: tasks.statusFilter,
          sort_field: tasks.sortField,
          sort_order: tasks.sortOrder
        }
      });
      return { tasks: response.data.tasks, total: response.data.total };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch tasks');
    }
  }
);

export const addTask = createAsyncThunk<Task, Omit<Task, 'idtask'>, { rejectValue: string }>(
  'tasks/addTask',
  async (task, { rejectWithValue }) => {
    try {
      const response = await api.post('/tasks', task);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add task');
    }
  }
);

export const removeTask = createAsyncThunk<number, number, { rejectValue: string }>(
  'tasks/removeTask',
  async (idtask, { rejectWithValue }) => {
    try {
      await api.delete(`/tasks/${idtask}`);
      return idtask;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to remove task');
    }
  }
);

export const updateTaskStatus = createAsyncThunk(
  'tasks/updateTaskStatus',
  async ({ id, is_completed }: { id: number; is_completed: boolean }) => {
    await api.put(`/tasks/${id}`, { is_completed }); 
    return { id, is_completed };
  }
);

export const updateTask = createAsyncThunk<Task, { idtask: number; updates: Partial<Task> }, { rejectValue: string }>(
  'tasks/updateTask',
  async ({ idtask, updates }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/tasks/${idtask}`, updates);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update task');
    }
  }
);

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.currentPage = 0;
      state.tasks = [];
      state.hasMore = true;
    },
    setStatusFilter: (state, action) => {
      state.statusFilter = action.payload;
      state.currentPage = 0;
      state.tasks = [];
      state.hasMore = true;
    },
    setSort: (state, action) => {
      state.sortField = action.payload.field;
      state.sortOrder = action.payload.order;
      state.currentPage = 0;
      state.tasks = [];
      state.hasMore = true;
    },
    resetPagination: (state) => {
      state.currentPage = 0;
      state.tasks = [];
      state.hasMore = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = [...state.tasks, ...action.payload.tasks];
        state.totalTasks = action.payload.total;
        state.hasMore = (state.currentPage + 1) * state.pageSize < action.payload.total;
        state.currentPage += 1;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch tasks';
      })
      .addCase(addTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTask.fulfilled, (state) => {
        state.loading = false;
        state.tasks = [];
        state.currentPage = 0;
        state.hasMore = true;
      })
      .addCase(addTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to add task';
      })
      .addCase(removeTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeTask.fulfilled, (state) => {
        state.loading = false;
        state.tasks = [];
        state.currentPage = 0;
        state.hasMore = true;
      })
      .addCase(removeTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to remove task';
      })
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.tasks.findIndex(t => t.idtask === action.payload.idtask);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update task';
      });
  }
});

export const { setSearchQuery, setStatusFilter, setSort, resetPagination } = taskSlice.actions;
export default taskSlice.reducer;