
import { AsyncStorage } from 'react-native';

export const getToken = (token) => ({
    type: 'GET_TOKEN',
    token,
});

export const saveToken = token => ({
    type: 'SAVE_TOKEN',
    token
});

export const removeToken = () => ({
    type: 'REMOVE_TOKEN',
});

export const loading = bool => ({
    type: 'LOADING',
    isLoading: bool,
});

export const error = error => ({
    type: 'ERROR',
    error,
});



export const getUserToken = () => async(dispatch) => {

    const token = await AsyncStorage.getItem('userToken');
        // .then((data) => {
        //     dispatch(loading(false));
        //     dispatch(getToken(data));
        //     console.log(data);
        //     return data;
        // })
        // .catch((err) => {
        //     dispatch(loading(false));
        //     dispatch(error(err.message || 'ERROR'));
        // })
    
    return token;

}


export const saveUserToken = (data) => dispatch =>
    AsyncStorage.setItem('userToken', data)
        .then((data) => {
            // console.log("token saved");
            dispatch(loading(false));
            dispatch(saveToken('token saved'));
        })
        .catch((err) => {
            dispatch(loading(false));
            dispatch(error(err.message || 'ERROR'));
        })

export const removeUserToken = () => dispatch =>
    AsyncStorage.removeItem('userToken')
        .then((data) => {
            dispatch(loading(false));
            dispatch(removeToken(data));
        })
        .catch((err) => {
            dispatch(loading(false));
            dispatch(error(err.message || 'ERROR'));
        })