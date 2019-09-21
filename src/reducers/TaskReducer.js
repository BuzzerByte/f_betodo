import { actionTypes } from '../actions/TaskAction';
// import console = require('console');

const initialState = {
  task: null,
};

console.log(task);

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TASK:
      return {
        ...state,
      };
    case actionTypes.SHOW_TASK:
      return {
        ...state,
        task: action.task,
      };
    case actionTypes.DELETE_TASK:
      return {
        ...state,
      };
    case actionTypes.UPDATE_TASK:
      return {
        ...state,
        task: action.task,
      };
    default:
      return state;
  }
};

export default taskReducer;
