// src/reducers/index.js
import { combineReducers } from 'redux';

const dummyReducer = (state = {}, action) => {
  return state;
};

const rootReducer = combineReducers({
  dummy: dummyReducer
});

export default rootReducer;