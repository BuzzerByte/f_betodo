import _ from 'lodash';

import React, {
  Component
} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  SafeAreaView,
  AsyncStorage,
} from 'react-native';
import {
  Avatar,
  Button,
  Icon,
  Input
} from 'react-native-elements';
import { connect, useSelector, useDispatch } from "react-redux";
import UserController from '../../../controllers/UserController';
import TaskController from '../../../controllers/TaskController';
import { showTask, addTask, deleteTask, updateTask } from "../../../actions/TaskAction";
import { getUserToken } from "../../../actions/TokenAction";
const SCREEN_WIDTH = Dimensions.get('window').width;

var taskArray = [];
class Payment extends Component {
  constructor(props) {

  }

  async componentDidMount() {
   
  }

  render() {

    return ( 
      <View> 
        
      </View>
    );
  }
}

const mapStateToProps = state => ({ 
   user:state.user,
   task:state.task.task,
   token: state.token.token,
});

const mapDispatchToProps = dispatch => ({
  addTask: (token, text) => dispatch(addTask(token, text)),
  deleteTask: (token, id) => dispatch(deleteTask(token, id)),
  updateTask: (token, text, id) => dispatch(updateTask(token, text, id)),
  showTask: (token) => dispatch(showTask(token)),
  getUserToken: () => dispatch(getUserToken())
});

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);

const styles = StyleSheet.create({
  statusBar: {
    height: 10,
  },
  navBar: {
    height: 60,
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    alignContent: 'center',
  },
  nameHeader: {
    color: 'black',
    fontSize: 25,
    fontFamily: 'regular',
    marginLeft: 20,
  },
  inputContainerStyle: {
    marginTop: 16,
    width: '90%',
    borderRadius: 40,
    borderWidth: 1,
    borderColor: 'rgba(110, 120, 170, 1)',
    height: 50,
    marginVertical: 10,
  },
});