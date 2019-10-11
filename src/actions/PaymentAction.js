import PaymentController from '../controllers/PaymentController';

export const actionTypes = {
  AUTH_REQUEST: 'AUTH_REQUEST',
  AUTH_ERROR: 'AUTH_ERROR',
  AUTH_SUCCESS: 'AUTH_SUCCESS',
  ALI_PAY_REQUEST: 'ALI_PAY_REQUEST',
  ALI_PAY_ERROR: 'ALI_PAY_ERROR',
  ALI_PAY_SUCCESS: 'ALI_PAY_SUCCESS',
};

const authRequest = () => ({
  type: actionTypes.AUTH_REQUEST,
});

const authError = error => ({
  type: actionTypes.AUTH_ERROR,
  error,
});

const authSuccess = auth => ({
  type: actionTypes.AUTH_SUCCESS,
  alipay,
});

const aliPayRequest = () => ({
  type: actionTypes.ALI_PAY_REQUEST,
});

const aliPayError = error => ({
  type: actionTypes.ALI_PAY_ERROR,
});

const aliPaySuccess = auth => ({
  type: actionTypes.ALI_PAY_SUCCESS,
  alipay,
});

export const auth = (email, password, c_password) => async(dispatch)=>{
  dispatch(authRequest());
  try{
    const alipay = await PaymentController.auth(email, password, c_password);
    dispatch(authSuccess(alipay));
  }catch(error){
    dispatch(authError(error));
  }
};

export const pay = (email, password) => async(dispatch) => {
  dispatch(aliPayRequest());
  try {
    const alipay = await PaymentController.pay(email, password);
    // console.log(user);
    dispatch(aliPaySuccess(alipay));
  } catch (error) {
    dispatch(aliPayError(error.message));
  }
};
