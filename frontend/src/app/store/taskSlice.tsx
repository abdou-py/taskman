import { createSlice } from '@reduxjs/toolkit';

interface Task {
  id: number;
  name: string;
  completed?: boolean; // Optional property for completed state
}

const initialState: { tasks: Task[] } = {
  tasks: [
    { id: 1, name: 'Learn Redux Toolkit' },
    { id: 2, name: 'Build a Task Management App' },
  ],
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: { payload: Task }) => {
      state.tasks.push(action.payload);
    },
    removeTask: (state, action: { payload: number }) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    updateTask: (state, action: { payload: { id: number; updates: Partial<Task> } }) => {
      const { id, updates } = action.payload;
      const existingTaskIndex = state.tasks.findIndex((task) => task.id === id);

      if (existingTaskIndex !== -1) {
        state.tasks[existingTaskIndex] = {
          ...state.tasks[existingTaskIndex],
          ...updates,
        };
      }
    },
  },
});

export const { addTask, removeTask, updateTask } = taskSlice.actions;
export default taskSlice.reducer;