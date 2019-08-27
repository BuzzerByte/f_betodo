import UserController from '../controllers/UserController';

export const actionTypes = {
  LOGIN: 'LOGIN',
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_ERROR: 'LOGIN_ERROR',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGOUT: 'LOGOUT',
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

export const signup = (email, password, c_password) => async(dispatch)=>{
  dispatch(loginRequest());
  try{
    const user = await UserController.signup(email, password, c_password);
    console.log('signup success');
    dispatch(loginSuccess(user));
  }catch(error){
    dispatch(loginError(error));
  }
};

export const login = (email, password) => async(dispatch) => {
  dispatch(loginRequest());
  try {
    // console.log('in user action login');
    const user = await UserController.login(email, password);
    // console.log(user);
    return user;
    dispatch(loginSuccess(user));
  } catch (error) {
    dispatch(loginError(error.message));
  }
};

export const logout = () => (dispatch) => {
  UserController.logout();
  dispatch(logoutRequest());
};
