import React from 'react';
import ReactDOM from 'react-dom/client';
import Index from './pages/Index.jsx';
import './index.css';
import { AuthProvider } from './pages/authentication/AuthContext.jsx';
import { UserProvider } from './pages/authentication/UserContext.jsx'; // Import UserProvider

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <UserProvider>
        <Index />
      </UserProvider>
    </AuthProvider>
  </React.StrictMode>
);
