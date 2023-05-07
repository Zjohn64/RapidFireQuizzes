// src/reducers/quizSlice.js
import { createSlice } from '@reduxjs/toolkit';

const quizSlice = createSlice({
  name: 'quiz',
  initialState: { quizzes: [] },
  reducers: {
    addQuiz: (state, action) => {
      state.quizzes.push(action.payload);
    },
  },
});

export const { addQuiz } = quizSlice.actions;

export default quizSlice.reducer;