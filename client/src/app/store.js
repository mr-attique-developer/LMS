import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '@/features/api/authApi';
import { courseApi } from '@/features/api/courseApi';
import rootReducer from './rootReducers';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, courseApi.middleware),
});


const getRidFromRefreshing = async() => {
await store.dispatch(authApi.endpoints.getUserProfile.initiate({}, {forceRefetch: true}))

  
}

getRidFromRefreshing()