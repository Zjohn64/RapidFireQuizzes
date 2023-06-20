// store.js
import { configureStore } from 'redux';
import { authReducer } from './reducer';

export const store = configureStore(authReducer);