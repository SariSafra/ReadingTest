import React from 'react';
import ReactDOM from 'react-dom/client';
import Index from './pages/Index.jsx';
import './index.css';
import { AuthProvider } from './pages/authentication/AuthContext.jsx'; // Adjust the path as necessary

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <Index />
    </AuthProvider>
  </React.StrictMode>
);
