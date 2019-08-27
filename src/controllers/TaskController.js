import httpClient from './HttpClient';
import axios from 'axios';
import {
    AsyncStorage
} from 'react-native';

class TaskController {
    constructor() {
        this.basePath = '/tasks';

    }

    index = async (AuthStr) => {
        axios.get('http://192.168.1.97/api/task', {
            headers: {
                Authorization: AuthStr
            },
        })
        .then(response => {
            // // If request is good...
            // taskArray = response.data;
            // //add a property onUpdate, and set that to false
            // taskArray = taskArray.map((data) => {
            //     var o = Object.assign({}, data);
            //     o.onUpdate = false;
            //     return o;
            // });
            // this.setState({
            //     tasks: taskArray
            // });
            console.log(response.data);
        })
        .catch((error) => {
            console.log('error ' + error);
            
        });
    }

    login = async (email, password) => {
        const result = await axios.post('http://192.168.1.97/api/login', {
            email: email,
            password: password,
            // c_password: passwordConfirmation
        });

        return result.data.success.token;
    }

    signup = async (email, password, passwordConfirmation) => {
        const result = await axios.post("http://192.168.1.97/api/register", {
                email: email,
                password: password,
                c_password: passwordConfirmation
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        return result;
    }

    logout = () => null;
}

export default new TaskController();