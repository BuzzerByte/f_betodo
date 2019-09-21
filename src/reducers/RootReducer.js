import { combineReducers } from 'redux';
import error from './ErrorReducer';
import user from './UserReducer';
import status from './StatusReducer';
import task from './TaskReducer';

const rootReducer = combineReducers({
  error,
  user,
  status,
  task,
});

export default rootReducer;
