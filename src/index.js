import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import { AuthProvider } from './components/authContext';

const root = document.getElementById('root');
createRoot(root).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);