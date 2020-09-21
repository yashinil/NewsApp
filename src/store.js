import { createStore, combineReducers } from 'redux';
import { displayDetails } from './reducers';

const reducers={
  displayDetails,
};
const rootReducer= combineReducers(reducers);

export const configureStore = () => createStore(rootReducer);
