import { combineReducers } from '@reduxjs/toolkit';
import { authApi } from '@/features/api/authApi';
import authReducer from '../features/authSlice';
import {courseApi} from "@/features/api/courseApi"
import { lectureApi } from '@/features/api/lectureApi';
import { coursePurchaseApi } from '@/features/api/coursePurchaseApi';

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [courseApi.reducerPath]: courseApi.reducer ,
  [lectureApi.reducerPath]: lectureApi.reducer ,
  [coursePurchaseApi.reducerPath]: coursePurchaseApi.reducer ,
  auth: authReducer,
});

export default rootReducer;