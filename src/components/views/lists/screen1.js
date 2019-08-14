import _ from 'lodash';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  SafeAreaView,
  AsyncStorage,
} from 'react-native';
import { Avatar, Button, Icon, Input} from 'react-native-elements';
import axios from 'axios';
import { TextInput } from 'react-native-gesture-handler';
// import { cacheFonts } from '../../helpers/AssetsCaching';

const SCREEN_WIDTH = Dimensions.get('window').width;
const BEARER_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImFkZTc0YTcyOGU5MzAzNDkxNGEwOTM5MDM5OTY1MTkyYTQ3MGIxZDkyMDdhZGNjMjIzZWFkMDIwNmE3NzVlMWY0NmMyOWU3ZDdkOGE3ZGM4In0.eyJhdWQiOiIxIiwianRpIjoiYWRlNzRhNzI4ZTkzMDM0OTE0YTA5MzkwMzk5NjUxOTJhNDcwYjFkOTIwN2FkY2MyMjNlYWQwMjA2YTc3NWUxZjQ2YzI5ZTdkN2Q4YTdkYzgiLCJpYXQiOjE1NjQ4MDkxOTUsIm5iZiI6MTU2NDgwOTE5NSwiZXhwIjoxNTk2NDMxNTk1LCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.DNSG-ijl0Szk-0WQhf6CvUVydwe_oQputea8ivKiGauuipRTH9Y2B6SMv5yMVi5U1y941ygOaTkLG8oD73DWZK_M-xKyAO-B7kIbzQnOkX9N6vyAqprpUWMZ6GpULioThKPzMPWQzA1At9hIiNz_xIJwKl8Lpxg4HocV_XaIYYhhngCFHfunsuqwHoyNFTuH02CJJdwHRFk7ju6vNPM17cVuAtIFyaY0agzScDxZ-lye31KGELZo17I_2LITgyAK10UuZZvHaIF2-BofiJcnnbqzcaQH2dWOy61sT_herUTBTum9i6BhU9JHpbEHkauDyU5MtO_x37fidqQXf79_4SJ9A1K01tZrZfmzblM3uruuzYSkMr7s23qY_bi6F3ZRzY_R4Rcu5vKk5UsUrdhSh5P6j6UcHH5wI4pZ-ga115iP-okhN2SP3AcdUoZvFTNTB9ZzzBcQ3liCCoRlTR40zb4lZn2Y0mNGi1upNlvqZVD3UmlJ4Ji9uH3_YzReTigE5qd3CKVAa6CSKx7fGldJU-c3WPRQnWxJZx6Bfe6rJNoTmB56omdtU-h0V788VGwB_JJ7MkJdi9NsLqX7XNbiTkjZ0nGpq2u5wzkv3Fsj2gwkncuLLkfPhyA-oO2nxSSqyFZMa2_draJzF8TyQll4EZy76L_F-xMyls8wy7XCung";

var taskArray = [];
export default class ListsScreen1 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fontLoaded: false,
      newTask: '',
      editable: false,
      tasks: taskArray,
      updateTask: '',
    };
  }

  async getToken(){
    try{
      const userData = await AsyncStorage.getItem('userData',(err,value) => {
        // console.log("Get Token: "+JSON.parse(value));
      });
      
      return userData;
      
    }catch(error){
      console.log('Something went wrong', error);
    }
  }
  async componentDidMount() {
    
    this.getToken().then((data) => {
      // console.log("Token: "+ data);
      // console.log("Get:"+data);
      const AuthStr = 'Bearer '.concat(BEARER_TOKEN); 
      // console.log(AuthStr);
      axios.get('http://192.168.1.97/api/task', { 
        headers: { Authorization: AuthStr },
      })
      .then(response => {
        // If request is good...
        taskArray = response.data;

        //add a property onUpdate, and set that to false
        taskArray = taskArray.map((data)=>{
          var o = Object.assign({}, data);
          o.onUpdate = false;
          return 0;
        });
        this.setState({ tasks: taskArray });
        console.log("tasks"+ this.state.tasks);
        console.log("taskArray" + taskArray);
      })
      .catch((error) => {
        console.log('error ' + error);
      });
    });
    
    this.setState({ fontLoaded: true });
  }

  onSubmitNewTask(newTask){
    console.log(newTask);
    const AuthStr = 'Bearer '.concat(BEARER_TOKEN); 
    axios.post('http://192.168.1.97/api/task', {
      name: newTask,
      lastName: ''
    },{
      headers: { Authorization: AuthStr },
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  findTaskIndex(taskId){
    let {tasks} = this.state;
    for(var i = 0; i < tasks.length; i++){
      if(tasks[i].id == taskId){
        return i;
      }
    }
    return -1;
  }

  toggleEditTask(taskId){
    var foundIndex = this.findTaskIndex(taskId);
    var newTasks = this.state.tasks;
    newTasks[foundIndex].onUpdate = !newTasks[foundIndex].onUpdate;
    console.log("idx is "+ foundIndex);
  }

  renderValue(task) {
    const { value, positive } = task;

    if (positive) {
      return (
        <View
          style={{
            backgroundColor: 'rgba(220,230,218,1)',
            width: 70,
            height: 28,
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            marginLeft: 10,
          }}
        >
          <Icon name="md-arrow-dropup" type="ionicon" color="green" size={25} />
          <Text
            style={{
              color: 'green',
              fontFamily: 'regular',
              fontSize: 13,
              marginLeft: 5,
            }}
          >
            {value}
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
          {/* <Icon name="md-arrow-dropdown" type="ionicon" color="red" size={25} />
          <Text
            style={{
              color: 'red',
              fontFamily: 'regular',
              fontSize: 13,
              marginLeft: 5,
            }}
          >
            {value}
          </Text> */}
        </View>
      );
    }
  }

  renderCard(task, index) {
    const {id, name , description } = task;
    
    return (
      <View
        key={index}
        style={{
          height: 60,
          marginHorizontal: 10,
          marginTop: 10,
          backgroundColor: 'white',
          borderRadius: 5,
          alignItems: 'center',
          flexDirection: 'row',
        }}
      >
        <View style={{ flex: 2, flexDirection: 'row', alignItems: 'center' }}>
          
          <View style={{ marginLeft: 15 }}>
            {/* <Avatar
              small
              rounded
              source={{
                uri: avatar,
              }}
              activeOpacity={0.7}
            /> */}
          </View>
          {this.state.onUpdate ? (
            <Input
              style={{
                fontFamily: 'regular',
                fontSize: 15,
                marginLeft: 10,
                color: 'gray',
              }}
              onChangeText={(updateTask) => this.setState({updateTask})}
              autoFocus
              // onBlur={() => this.setState({ editable: false })}
            >
              {name}
            </Input>
          ) : (
            <Text
              style={{
                fontFamily: 'regular',
                fontSize: 15,
                marginLeft: 10,
                color: 'gray',
              }}
              onPress={() => this.toggleEditTask(task.id)}               
            >
              {name}
            </Text>
          )}
          <Text
            style={{
              fontFamily: 'regular',
              fontSize: 15,
              marginLeft: 10,
              color: 'gray',
            }}
          >
            {/* {description} */}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginRight: 10,
          }}
        >
          {this.renderValue(task)}
          <View
            style={{
              backgroundColor: 'rgba(222,222,222,1)',
              width: 35,
              height: 28,
              borderRadius: 5,
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: 10,
            }}
          >
          {this.state.editable ? (
            <Icon
              name="plus"
              type="font-awesome"
              color="#86939e"
              size={20}
              onPress={() => this.onSubmitNewTask(this.state.newTask)} 
            />
          ):(
            <Icon name="md-trash" type="ionicon" color="gray" size={20}  />
          )}
            
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
          <SafeAreaView
            style={{ flex: 1, backgroundColor: 'rgba(241,240,241,1)' }}
          >
            <View style={styles.statusBar} />
            <View style={styles.navBar}>
              <Text style={styles.nameHeader}>Tasks</Text>
            </View>
            <ScrollView style={{ flex: 1, marginBottom: 20 }}>
              
              {this.renderListCards()}
            </ScrollView>
            <View style={{ alignItems: 'center', marginBottom: 16 }}>
            <Input
              rightIcon={
                <Icon
                  name="plus"
                  type="font-awesome"
                  color="#86939e"
                  size={25}
                  onPress={() => this.onSubmitNewTask(this.state.newTask)} 
                />
              }
              onChangeText={(newTask) => this.setState({newTask})}
              leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
              containerStyle={styles.inputContainerStyle}
              placeholder="New task"
            />
            </View>
          </SafeAreaView>
          
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
    );
  }
}

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
