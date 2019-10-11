import { combineReducers } from 'redux';
import error from './ErrorReducer';
import user from './UserReducer';
import status from './StatusReducer';
import task from './TaskReducer';
import token from './TokenReducer';

const rootReducer = combineReducers({
  error,
  user,
  status,
  task,
  token,
});

export default rootReducer;
