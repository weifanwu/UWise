import { configureStore } from '@reduxjs/toolkit';
import classesReducer from './slices';

export const store = configureStore({
  reducer: {
    classes: classesReducer,
  },
});