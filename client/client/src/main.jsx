import React from 'react';
import ReactDOM from 'react-dom/client';
import Index from './Index.jsx';
import './index.css';
import { AuthProvider } from './AuthContext'; // Adjust the path as necessary

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <Index />
    </AuthProvider>
  </React.StrictMode>
);
