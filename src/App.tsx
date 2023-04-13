import { NotFound, PrivateRoute } from 'components/Common';
import { AdminLayout } from 'components/Layout/AdminLayout';
import LoginPage from 'features/auth/pages/LoginPage';
import { Dashboard } from 'features/dashboard';
import AddEditStudent from 'features/students/pages/AddEditStudent';
import StudentList from 'features/students/pages/StudentList';
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
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="students" element={<StudentList />} />
        <Route path="students/add" element={<AddEditStudent />} />
        <Route path="students/:studentId" element={<AddEditStudent />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
