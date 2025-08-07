import { configureStore } from '@reduxjs/toolkit';
import { api } from '../features/api/apiSlice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefault) => getDefault().concat(api.middleware),
});
