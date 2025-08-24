import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter for routing
import AuthProvider from './auth/AuthProvider.jsx'; // Authentication Context Provider
import './index.css';
import { Router } from './router/Router.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Router />
        <Toaster />
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
);
