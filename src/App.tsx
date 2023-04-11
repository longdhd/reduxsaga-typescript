import { NotFound, PrivateRoute } from 'components/Common';
import { AdminLayout } from 'components/Layout/AdminLayout';
import LoginPage from 'features/auth/pages/LoginPage';
import { Dashboard } from 'features/dashboard';
import { Students } from 'features/students';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/admin" element={
        <PrivateRoute>
          <AdminLayout />
        </PrivateRoute>
      }>
        <Route path="dashboard" element={<Dashboard />}/>
        <Route path="students" element={<Students />}/>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
