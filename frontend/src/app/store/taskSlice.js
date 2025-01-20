import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [
    { id: 1, name: 'Learn Redux Toolkit' },
    { id: 2, name: 'Build a Task Management App' },
  ],
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
  },
});

export const { addTask, removeTask } = taskSlice.actions;
export default taskSlice.reducer;