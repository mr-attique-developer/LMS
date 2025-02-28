import { combineReducers } from '@reduxjs/toolkit';
import { authApi } from '@/features/api/authApi';
import authReducer from '../features/authSlice';
import {courseApi} from "@/features/api/courseApi"
import { lectureApi } from '@/features/api/lectureApi';
import { coursePurchaseApi } from '@/features/api/coursePurchaseApi';
import { courseProgressApi } from '@/features/api/courseProgressApi';

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [courseApi.reducerPath]: courseApi.reducer ,
  [lectureApi.reducerPath]: lectureApi.reducer ,
  [coursePurchaseApi.reducerPath]: coursePurchaseApi.reducer ,
  [courseProgressApi.reducerPath]: courseProgressApi.reducer,

  auth: authReducer,
});

export default rootReducer;