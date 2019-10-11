import { actionTypes } from '../actions/PaymentAction';

const initialState = {
    alipay: null,
};

const paymentReducer = (state = initialState, action) => {
  switch (action.type) {
  case actionTypes.AUTH_REQUEST:
      return {
        ...state,
      };
    case actionTypes.AUTH_ERROR:
      return {
        ...state,
      };
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        alipay: action.alipay,
      };
    case actionTypes.ALI_PAY_REQUEST:
      return {
        ...state,
      };
    case actionTypes.ALI_PAY_ERROR:
      return {
        ...state,
    };
    case actionTypes.ALI_PAY_SUCCESS:
      return {
        ...state,
        alipay: action.alipay,
    };
    default:
      return state;
  }
};

export default paymentReducer;
