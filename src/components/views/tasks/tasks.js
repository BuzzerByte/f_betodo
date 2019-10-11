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
class Tasks extends Component {
  constructor(props) {
    super(props);
    BEARER_TOKEN = this.getToken();
    this.state = {
      fontLoaded: false,
      newTask: '',
      editable: false,
      tasks: taskArray,
      updateTask: '',
    };
    this.getAllTask = this.getAllTask.bind(this);
    this.onSubmitNewTask = this.onSubmitNewTask.bind(this);
    this.onSubmitUpdateTask = this.onSubmitUpdateTask.bind(this);
    this.onDeleteTask = this.onDeleteTask.bind(this);
  }

  async getToken() {
    const token = await UserController.getUserToken();
    // console.log(token);
    return token;
    
  }

  async componentDidMount() {
    await this.props.getUserToken();
    await this.props.showTask('Bearer '+this.props.token);
    // console.log(this.props.task);
    taskArray = this.props.task.data;
    taskArray = taskArray.map((data)=>{
      var o = Object.assign({}, data);
      o.onUpdate = false;
      return o;
    });
    this.setState({
      tasks:taskArray
    });
    
    this.setState({
      fontLoaded: true
    });
    // this.removeItemValue('userData');
  }
  
  async getAllTask() {
    await this.props.showTask('Bearer '+ this.props.token);
    taskArray = this.props.task.data;
    taskArray = taskArray.map((data)=>{
      var o = Object.assign({}, data);
      o.onUpdate = false;
      return o;
    });
    this.setState({
      tasks:taskArray
    });
  }

  async onSubmitNewTask(newTask) {
    await this.props.addTask('Bearer '+this.props.token, newTask);
    this.getAllTask();
  }

  async onSubmitUpdateTask(updateTask, id) {
    await this.props.updateTask('Bearer '+ this.props.token, updateTask, id);
    this.getAllTask();
  }

  async onDeleteTask(id) {
    await this.props.deleteTask('Bearer '+ this.props.token, id);
    console.log(this.props.task);
    this.getAllTask();
  }

  findTaskIndex(taskId) {
    let {
      tasks
    } = this.state;
    for (var i = 0; i < tasks.length; i++) {
      if (tasks[i].id == taskId) {
        return i;
      }
    }
    return -1;
  }

  toggleEditTask(taskId) {
    var foundIndex = this.findTaskIndex(taskId);
    var newTasks = this.state.tasks;
    newTasks[foundIndex].onUpdate = !newTasks[foundIndex].onUpdate;

    this.setState({
      tasks: newTasks
    });
  }

  renderValue(task) {
    const {value,positive} = task;

    if (positive) {
      return ( 
        <View style = {
          {
            backgroundColor: 'rgba(220,230,218,1)',
            width: 70,
            height: 28,
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            marginLeft: 10,
          }
        } >
          <Icon 
          name = "md-arrow-dropup"
          type = "ionicon"
          color = "green"
          size = {25}
          /> 
          <Text style = {
            {
              color: 'green',
              fontFamily: 'regular',
              fontSize: 13,
              marginLeft: 5,
            }
          } > {value} 
          </Text> 
        </View>
      );
    } else {
      return (
        <View
        // style={{
        //   backgroundColor: 'rgba(244,230,224,1)',
        //   width: 70,
        //   height: 28,
        //   borderRadius: 5,
        //   justifyContent: 'center',
        //   alignItems: 'center',
        //   flexDirection: 'row',
        //   marginLeft: 10,
        // }}
        >
        {
          /* <Icon name="md-arrow-dropdown" type="ionicon" color="red" size={25} />
                    <Text
                      style={{
                        color: 'red',
                        fontFamily: 'regular',
                        fontSize: 13,
                        marginLeft: 5,
                      }}
                    >
                      {value}
                    </Text> */
        } 
        </View>
      );
    }
  }

  renderCard(task, index) {
    const {
      id,
      name,
      description
    } = task;

    return ( 
      <View 
        key = {index}
        style = {{
            height: 60,
            marginHorizontal: 10,
            marginTop: 10,
            backgroundColor: 'white',
            borderRadius: 5,
            alignItems: 'center',
            flexDirection: 'row',
        }} >
        <View style = {
          {
            flex: 2,
            flexDirection: 'row',
            alignItems: 'center'
          }
        } >

        <View style = {{
            marginLeft: 15
        }}> 
        </View> 
        {task.onUpdate ? ( 
          <Input style = {
            {
              fontFamily: 'regular',
              fontSize: 15,
              marginLeft: 10,
              color: 'gray',
            }
          }
          onChangeText = {(updateTask) => this.setState({updateTask})}
          autoFocus
          onBlur = {() => this.onSubmitUpdateTask(this.state.updateTask, task.id)}
        
         > {name}</Input>
        ) : ( 
          <Text style = {
            {
              fontFamily: 'regular',
              fontSize: 15,
              marginLeft: 10,
              color: 'gray',
            }
          }
          onPress = {() => this.toggleEditTask(task.id)} > 
          {name} 
          </Text>
        )
      } 
        <Text style = {
          {
            fontFamily: 'regular',
            fontSize: 15,
            marginLeft: 10,
            color: 'gray',
          }
        } > {/* {description} */} 
        </Text> 
      </View> 
      <View style = {{
          flexDirection: 'row',
          justifyContent: 'center',
          marginRight: 10,
        }} > 
        {this.renderValue(task)} 
        <View style = {
          {
            backgroundColor: 'rgba(222,222,222,1)',
            width: 35,
            height: 28,
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 10,
          }
        } > 
        {
          task.onUpdate ? ( 
            <Icon 
              name = "plus"
              type = "font-awesome"
              color = "#86939e"
              size = {20}
              onPress = {() => this.onSubmitUpdateTask(this.state.updateTask, task.id)}
            />
          ) : ( 
            <Icon 
              name = "md-trash"
              type = "ionicon"
              color = "gray"
              size = {20}
              onPress = {() => this.onDeleteTask(task.id)}
            />
          )
        }

        </View> 
      </View>
    </View>
  );
  }

  renderListCards() {

    return _.map(this.state.tasks, (task, index) => {
      return this.renderCard(task, index);
    });
  }

  render() {

    return ( 
      <View> 
      {this.state.fontLoaded ? ( 
          <SafeAreaView style = {{
              flex: 1,
              backgroundColor: 'rgba(241,240,241,1)'
            }}>
          <View style = {styles.statusBar}/> 
          <View style = {styles.navBar}>
          {/* <Text style = {styles.nameHeader}> Tasks </Text>  */}
          </View> 
            <ScrollView style = {{
                flex: 1,
                marginBottom: 20
              }}>

            {this.renderListCards()} 
            </ScrollView> 
          <View style = {
            {
              alignItems: 'center',
              marginBottom: 16
            }
          } >
          <Input 
            rightIcon = {
              <Icon
              name = "plus"
              type = "font-awesome"
              color = "#86939e"
              size = {25}
              onPress = {() => this.onSubmitNewTask(this.state.newTask)}
              />
            }
            onChangeText = {(newTask) => this.setState({newTask})}
            leftIconContainerStyle = {{
                marginLeft: 0,
                marginRight: 10
            }}
            // containerStyle = {
            //   styles.inputContainerStyle
            // }
            placeholder = "New task" />
          </View> 
          </SafeAreaView>

        ) : ( 
          <Text> Loading... </Text>
        )
      } 
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