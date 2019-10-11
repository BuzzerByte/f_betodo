import { actionTypes } from '../actions/TaskAction';
// import console = require('console');

const initialState = {
  task: null,
};

// console.log(task);

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TASK_SUCCESS:
      return {
        ...state,
        task: action.task,
      };
    case actionTypes.SHOW_TASK_SUCCESS:
      return {
        ...state,
        task: action.task,
      };
    case actionTypes.DELETE_TASK_SUCCESS:
      return {
        ...state,
        task: action.task,
      };
    case actionTypes.UPDATE_TASK_SUCCESS:
      return {
        ...state,
        task: action.task,
      };
    default:
      return state;
  }
};

export default taskReducer;
