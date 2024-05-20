import { configureStore } from '@reduxjs/toolkit';
import adminReducer from '../features/admin/adminSlice';
import authReducer from '../features/auth/authSlice';
import goalReducer from '../features/goals/goalSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    goal: goalReducer,
    adminAuth: adminReducer
  },
});
