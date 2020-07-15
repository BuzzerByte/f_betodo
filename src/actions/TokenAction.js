import AsyncStorage from '@react-native-community/async-storage';

export const actionTypes = {
  GET_TOKEN: "GET_TOKEN",
  SAVE_TOKEN: "SAVE_TOKEN",
  REMOVE_TOKEN: "REMOVE_TOKEN",
  LOADING: "LOADING",
  ERROR: "ERROR",
};

export const getToken = (token) => ({
  type: "GET_TOKEN",
  token,
});

export const saveToken = (token) => ({
  type: "SAVE_TOKEN",
  token,
});

export const removeToken = () => ({
  type: "REMOVE_TOKEN",
});

export const loading = (bool) => ({
  type: "LOADING",
  isLoading: bool,
});

export const error = (error) => ({
  type: "ERROR",
  error,
});

export const getUserToken = () => async (dispatch) => {
  dispatch(loading(true));
  try {
    const token = await AsyncStorage.getItem("userToken");
    dispatch(getToken(token));
    dispatch(loading(false));
  } catch (error) {
    dispatch(error(error));
    dispatch(loading(false));
  }
};

export const saveUserToken = (data) => async (dispatch) => {
  dispatch(loading(true));
  try {
    await AsyncStorage.setItem("userToken", data);
    console.log(data);
    dispatch(loading(false));
    dispatch(saveToken(data));
  } catch (error) {
    dispatch(loading(false));
    dispatch(error(error));
  }

  // .then((data) => {
  //     // console.log("token saved");
  //     dispatch(loading(false));
  //     dispatch(saveToken('token saved'));
  // })
  // .catch((err) => {
  //     dispatch(loading(false));
  //     dispatch(error(err.message || 'ERROR'));
  // })
};

export const removeUserToken = () => async (dispatch) => {
  dispatch(loading(true));
  try {
    AsyncStorage.removeItem("userToken");
    dispatch(loading(false));
    dispatch(removeToken());
  } catch (error) {
    dispatch(loading(false));
    dispatch(error(error));
  }

  // AsyncStorage.removeItem('userToken')
  // .then((data) => {
  //     dispatch(loading(false));
  //     dispatch(removeToken(data));
  // })
  // .catch((err) => {
  //     dispatch(loading(false));
  //     dispatch(error(err.message || 'ERROR'));
  // })
};
