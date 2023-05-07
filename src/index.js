import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/App';
import store from './store';

const root = document.getElementById('root');
createRoot(root).render(
  <Provider store={store}>
    <App />
  </Provider>
);