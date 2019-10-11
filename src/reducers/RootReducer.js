import { combineReducers } from 'redux';
import error from './ErrorReducer';
import user from './UserReducer';
import status from './StatusReducer';
import task from './TaskReducer';
import token from './TokenReducer';
import alipay from './PaymentReducer';

const rootReducer = combineReducers({
  error,
  user,
  status,
  task,
  token,
  alipay,
});

export default rootReducer;
