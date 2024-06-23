import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from './AuthContext.jsx';
import App from './App.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import PasswordReset from './pages/PasswordReset.jsx';
import PasswordResetRequest from './pages/PasswordResetRequest.jsx';
import StudentHome from './pages/studentArea/StudentHome.jsx';  // Your student home component
import TeacherHome from './pages/teacherArea/TeacherHome.jsx';  // Your teacher home component
import ProtectedRoute from './ProtectedRoute .jsx';  // New ProtectedRoute component
import './index.css';

function Index() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/password-reset-request" element={<PasswordResetRequest />} />
          <Route path="/password-reset" element={<PasswordReset />} />
          <Route element={<ProtectedRoute allowedRoles={['student']} />}>
            <Route path="/studentHome" element={<StudentHome />} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={['teacher']} />}>
            <Route path="/teacherHome" element={<TeacherHome />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default Index;
