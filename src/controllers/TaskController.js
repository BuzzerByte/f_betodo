import httpClient from './HttpClient';
import axios from 'axios';
import {
    AsyncStorage
} from 'react-native';

class TaskController {
    constructor() {
        this.basePath = 'http://192.168.1.97/api';
    }

    index = async (AuthStr) => {
        var data = await axios.get(this.basePath + '/task', {
            headers: {
                Authorization: AuthStr
            },
        });
        return data;
    }

    store = async (AuthStr, newTask) => {
      var data = await axios.post(this.basePath+'/task', {
        name: newTask,
        lastName: ''
      }, {
        headers: {
          Authorization: AuthStr
        },
      });
      return data;
    }

    update = async (AuthStr, updateTask, id) => {
        var data = await axios.put(this.basePath + '/task/' + id, {
            name: updateTask,
        }, {
            headers: {
                Authorization: AuthStr
            },
        });
        return data;
    }

    delete = async (AuthStr, id) => {
        var data = await axios.delete(this.basePath + '/task/' + id, {
            headers: {
                Authorization: AuthStr
            },
        });
        return data;
    }

    login = async (email, password) => {
        const result = await axios.post(this.basePath + '/login', {
            email: email,
            password: password,
            // c_password: passwordConfirmation
        });

        return result.data.success.token;
    }

    signup = async (email, password, passwordConfirmation) => {
        const result = await axios.post(this.basePath + '/register', {
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