import cityApi from 'api/cityApi';
import { useAppDispatch } from 'app/hooks';
import { NotFound, PrivateRoute } from 'components/Common';
import { AdminLayout } from 'components/Layout/AdminLayout';
import { authAction } from 'features/auth/authSlice';
import LoginPage from 'features/auth/pages/LoginPage';
import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    cityApi.getAll().then(response => console.log(response));
  }, [])
  return (
    <>
      <button
        onClick={() => dispatch(authAction.logout())}
      >Logout</button>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={
          <PrivateRoute>
            <AdminLayout />
          </PrivateRoute>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
