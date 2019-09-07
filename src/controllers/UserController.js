import httpClient from './HttpClient';
import axios from 'axios';
import { AsyncStorage } from 'react-native';

class UserController {
    constructor() {
      this.basePath = '/users';
      this.registerPath = '/register';
      this.loginPath = '/login';
    }
    // signup = async(email, password, c_password)=>{
    //   axios.post('http://192.168.1.97/api/register', {
    //     email: email,
    //     password: password,
    //     c_password: passwordConfirmation
    //   })
    //   .then(function (response) {
    //     console.log(response);
    //     return response;
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //     return error;
    //   });
    // }


    getUserToken = async() => {
      const token = await AsyncStorage.getItem('userToken');
      return token;
    }


    saveUserToken = (data) => {
       AsyncStorage.setItem('userToken', data);
    }

    removeUserToken = () => {
      AsyncStorage.removeItem('userToken');  
    }

    login = async (email, password) => {
      const result = await axios.post('http://192.168.1.97/api/login', {
        email: email,
        password: password,
        // c_password: passwordConfirmation
      });
      
      return result.data.success.token;
    }

    signup = async(email, password, passwordConfirmation) => {
      const result = await axios.post("http://192.168.1.97/api/register", {
        email: email,
        password: password,
        c_password: passwordConfirmation
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
      return result;
    }
    
    // logout = () => null;
    logout = () => {
      this.removeUserToken();
      return true;
    }
  }
  
  export default new UserController();
  