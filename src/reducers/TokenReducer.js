import { actionTypes } from '../actions/TokenAction';

const initialState = {
  token: null,
};

const tokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    case actionTypes.GET_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    case actionTypes.REMOVE_TOKEN:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default tokenReducer;
