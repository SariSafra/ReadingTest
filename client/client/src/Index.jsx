import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import PasswordReset from './pages/PasswordReset.jsx';
import './index.css';
function Index()
{
    return(<>
 <BrowserRouter>
    <Routes>
      <Route path="/" exact element={<App/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/password-reset" element={<PasswordReset/>} />
    </Routes>
  </BrowserRouter></>);
}
export default Index
