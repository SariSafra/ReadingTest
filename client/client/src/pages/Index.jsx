import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from './authentication/AuthContext.jsx';
import LandingPage from './LandingPage.jsx';
import Login from './authentication/Login.jsx';
import Signup from './authentication/Signup.jsx';
import PasswordReset from './authentication/PasswordReset.jsx';
import PasswordResetRequest from './authentication/PasswordResetRequest.jsx';
import StudentHome from './studentArea/StudentHome.jsx';  // Your student home component
import TeacherHome from './teacherArea/TeacherHome.jsx';  // Your teacher home component
import ProtectedRoute from './ProtectedRoute.jsx';  // New ProtectedRoute component
import '../index.css';
import TestManager from './studentArea/readingTest/TestManager.jsx';
import UserAccount from './UserAccount.jsx';
import UserArea from './UserArea.jsx';

function Index() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/password-reset-request" element={<PasswordResetRequest />} />
          <Route path="/password-reset" element={<PasswordReset />} />
          <Route path='my-account' element={<UserAccount/>}></Route>
          <Route path='/home' element = {<UserArea/>}>
          <Route element={<ProtectedRoute allowedRoles={['student']} />}>
            <Route path="student" element={<StudentHome />}/>
            <Route path="test" element={<TestManager/>}/>
          </Route>
          <Route element={<ProtectedRoute allowedRoles={['teacher']} />}>
            <Route path="teacher" element={<TeacherHome />} />
          </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default Index;
