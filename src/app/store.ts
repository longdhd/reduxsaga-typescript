import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import createSagaMiddleware from '@redux-saga/core';
import rootSaga from './rootSaga';
import authReducer from 'features/auth/authSlice';
import dashboardReducer from 'features/dashboard/dashboardSlice';
import studentReducer from 'features/students/studentSlice';
import cityReducer from 'features/city/citySlice';

const sagaMiddlware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    dashboard: dashboardReducer,
    student: studentReducer,
    city: cityReducer
  }, 
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddlware)
});

sagaMiddlware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
