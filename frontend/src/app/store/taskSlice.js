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
    updateTask: (state, action) => {
      const taskToUpdate = action.payload;
      const taskIndex = state.tasks.findIndex(
        (task) => task.id === taskToUpdate.id
      );

      if (taskIndex !== -1) {
        state.tasks[taskIndex] = taskToUpdate;
      }
    },
  },
});

export const { addTask, removeTask, updateTask } = taskSlice.actions;
export default taskSlice.reducer;