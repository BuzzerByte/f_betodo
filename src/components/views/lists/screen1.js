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
import { Avatar, Button, Icon } from 'react-native-elements';
import axios from 'axios';
// import { cacheFonts } from '../../helpers/AssetsCaching';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class ListsScreen1 extends Component {
  constructor(props) {
    super(props);
    axios.defaults.headers.common = {
      // 'X-CSRF-TOKEN': Laravel.csrfToken,
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': 'Bearer ' + this.getToken(),
    };

    this.state = {
      fontLoaded: false,
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
    
    
    axios.get('http://192.168.1.97/api/task').then((response) => {
      console.log(response)
    }).catch((error) => {
      console.log(error)
    });
    
    this.setState({ fontLoaded: true });
    
  }
  
  renderValue(user) {
    const { value, positive } = user;

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
          style={{
            backgroundColor: 'rgba(244,230,224,1)',
            width: 70,
            height: 28,
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            marginLeft: 10,
          }}
        >
          <Icon name="md-arrow-dropdown" type="ionicon" color="red" size={25} />
          <Text
            style={{
              color: 'red',
              fontFamily: 'regular',
              fontSize: 13,
              marginLeft: 5,
            }}
          >
            {value}
          </Text>
        </View>
      );
    }
  }

  renderCard(user, index) {
    const { name, avatar } = user;

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
            <Avatar
              small
              rounded
              source={{
                uri: avatar,
              }}
              activeOpacity={0.7}
            />
          </View>
          <Text
            style={{
              fontFamily: 'regular',
              fontSize: 15,
              marginLeft: 10,
              color: 'gray',
            }}
          >
            {name}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginRight: 10,
          }}
        >
          {this.renderValue(user)}
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
            <Icon name="md-person-add" type="ionicon" color="gray" size={20} />
          </View>
        </View>
      </View>
    );
  }

  renderListCards() {
    return _.map(this.USERS, (user, index) => {
      return this.renderCard(user, index);
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
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  backgroundColor: 'white',
                  borderRadius: 5,
                  alignItems: 'center',
                  marginHorizontal: 10,
                  height: 250,
                  marginBottom: 10,
                }}
              >
                <View style={{ flex: 3, flexDirection: 'row' }}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Avatar
                      width={145}
                      height={145}
                      source={{
                        uri:
                          'https://s3.amazonaws.com/uifaces/faces/twitter/jsa/128.jpg',
                      }}
                      activeOpacity={0.7}
                      avatarStyle={{ borderRadius: 145 / 2 }}
                      overlayContainerStyle={{ backgroundColor: 'transparent' }}
                    />
                  </View>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                        marginTop: 10,
                        justifyContent: 'center',
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: 'bold',
                          fontSize: 25,
                          color: 'rgba(98,93,144,1)',
                          marginLeft: -15,
                        }}
                      >
                        Paul Allen
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    width: 300,
                    borderWidth: 0.5,
                    borderColor: 'rgba(222, 223, 226, 1)',
                    marginHorizontal: 20,
                    height: 1,
                    marginVertical: 10,
                  }}
                />
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <View style={{ flex: 1, alignItems: 'center' }}>
                    <Button
                      title="View Profile"
                      buttonStyle={{
                        height: 33,
                        width: 120,
                        backgroundColor: 'rgba(222, 223, 226, 1)',
                        borderRadius: 5,
                      }}
                      titleStyle={{
                        fontFamily: 'regular',
                        fontSize: 13,
                        color: 'gray',
                      }}
                      onPress={() => console.log('aye')}
                      underlayColor="transparent"
                    />
                  </View>
                  <View style={{ flex: 1, alignItems: 'center' }}>
                    <Button
                      title="Add User"
                      buttonStyle={{
                        height: 33,
                        width: 120,
                        backgroundColor: 'rgba(113, 154, 112, 1)',
                        borderRadius: 5,
                      }}
                      titleStyle={{
                        fontFamily: 'regular',
                        fontSize: 13,
                        color: 'white',
                      }}
                      onPress={() => console.log('aye')}
                      underlayColor="transparent"
                    />
                  </View>
                </View>
              </View>
              {this.renderListCards()}
            </ScrollView>
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
});
