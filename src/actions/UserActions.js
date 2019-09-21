import UserController from '../controllers/UserController';

export const actionTypes = {
  LOGIN: 'LOGIN',
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_ERROR: 'LOGIN_ERROR',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGOUT: 'LOGOUT',
  SIGNUP_SUCCESS: 'SIGNUP_SUCCESS',
  SIGNUP_ERROR: 'SIGNUP_ERROR',
  SIGNUP_REQUEST: 'SIGNUP_REQUEST',
};

const loginRequest = () => ({
  type: actionTypes.LOGIN_REQUEST,
});

const loginError = error => ({
  type: actionTypes.LOGIN_ERROR,
  error,
});

const loginSuccess = user => ({
  type: actionTypes.LOGIN_SUCCESS,
  user,
});

const logoutRequest = () => ({
  type: actionTypes.LOGOUT,
});

const signupRequest = () => ({
  type: actionTypes.SIGNUP_REQUEST,
});

const signupSuccess = user => ({
  type: actionTypes.SIGNUP_SUCCESS,
  user,
});

const signupError = error => ({
  type: actionTypes.SIGNUP_ERROR,
  error,
});

export const signup = (email, password, c_password) => async(dispatch)=>{
  dispatch(signupRequest());
  try{
    const user = await UserController.signup(email, password, c_password);
    dispatch(signupSuccess(user));
  }catch(error){
    dispatch(signupError(error));
  }
};

export const login = (email, password) => async(dispatch) => {
  dispatch(loginRequest());
  try {
    const user = await UserController.login(email, password);
    // console.log(user);
    dispatch(loginSuccess(user));
  } catch (error) {
    dispatch(loginError(error.message));
  }
};

export const logout = () => (dispatch) => {
  UserController.logout();
  dispatch(logoutRequest());
};
