import _ from 'lodash';
import QueryString from 'query-string';
import Alipay from '@0x5e/react-native-alipay';

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
import { getUserToken } from "../../../actions/TokenAction";
import { auth, pay } from "../../../actions/PaymentAction";
const SCREEN_WIDTH = Dimensions.get('window').width;

class Payment extends Component {
  constructor(props) {
    super(props);
    this.onAlipay = this.onAlipay.bind(this);
  }

  async componentDidMount() {
    this.onAlipay();
  }

  
  async onAlipay(){
    while(1){
      await this.props.pay();
      console.log(this.props.alipay);
    }
  }

  render() {

    return ( 
      <View> 
        <SafeAreaView style = {{
              flex: 1,
              backgroundColor: 'rgba(241,240,241,1)'
            }}>
        <View style = {styles.statusBar}/> 
        <View style = {styles.navBar}></View>
        <View style={{ alignItems: 'center' }}>
            <Button
              title={`Alipay\nSimulation`}
              containerStyle={{ marginVertical: 10 }}
              onPress = {()=>this.onAlipay()} 
            />
        </View>
        </SafeAreaView>
      </View>
    );
  }
}

const mapStateToProps = state => ({ 
  user:state.user,
  token: state.token.token,
  alipay: state.alipay,
});

const mapDispatchToProps = dispatch => ({
  auth: () => dispatch(auth()),
  pay: () => dispatch(pay()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Payment);

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