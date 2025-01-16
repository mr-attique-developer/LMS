import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '@/features/api/authApi';
import rootReducer from './rootReducers';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});
