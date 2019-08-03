import httpClient from './HttpClient';
import axios from 'axios';

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
    login = async (email, password) =>{
      // console.log(email);
      // console.log(password);
      axios.post('http://192.168.1.97/api/login', {
        email: email,
        password: password,
        // c_password: passwordConfirmation
      })
      .then(function (response) {
        console.log(response.data.success);
        return response.data.success.token;
      })
      .catch(function (error) {
        console.log(error);
        return error;
      });
    // Real implementation of a login request using the HttpClient
        // try{
        //   const result = await httpClient.post({
        //       url: `${this.loginPath}`,
        //       method: 'POST',
        //       data: {
        //           email,
        //           password,
        //       },
        //   });
        //   console.log('in usercontroller: '+result);
        //   return result.data.user;
        // // Data is the object exposes by axios for the response json
        // } catch (error) {
        //   return error;
        // }
    };
    
      // This is a mocked example to simulate api behavior
    //   new Promise((resolve, reject) => {
    //     if (email !== 'a@a.com' && password !== '') {
    //       setTimeout(
    //         () => resolve({ name: 'Jorge' }),
    //         1000,
    //       );
    //     } else {
    //       setTimeout(
    //         () => reject(new Error('Invalid Email/Password')),
    //         1000,
    //       );
    //     }
    //   });
  
    logout = () => null;
  }
  
  export default new UserController();
  