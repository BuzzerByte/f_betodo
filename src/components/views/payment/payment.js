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
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import {
  Avatar,
  Button,
  Icon,
  Input,
  Image
} from 'react-native-elements';
import { connect, useSelector, useDispatch } from "react-redux";
import UserController from '../../../controllers/UserController';
import { getUserToken } from "../../../actions/TokenAction";
import { auth, pay } from "../../../actions/PaymentAction";
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
const BG_IMAGE = require("../../../assets/images/drop.png");

class Payment extends Component {
  constructor(props) {
    super(props);
    this.onAlipay = this.onAlipay.bind(this);
  }

  async componentDidMount() {
    //this.onAlipay();
  }

  
  async onAlipay(){
    // while(1){
      await this.props.pay();
      console.log(this.props.alipay);
    // }
  }

  showQRCode(type){

  }

  render() {

    return ( 
      <View style = {styles.container}> 
      <ImageBackground source={BG_IMAGE} style={styles.bgImage}>
        
        <View style = {styles.statusBar}/> 
        <View style = {styles.navBar}></View>
        <View style = {styles.container}> 
        <View style = {styles.iconContainer}>
            <TouchableOpacity
              onPress = {()=>this.onAlipay()} 
              >
              <Image
                style={styles.stretch}
                source={require("../../../assets/images/alipay.jpg")}
              />
              <Text style={styles.titleText}>5L</Text>
            </TouchableOpacity>
        </View>
        <View style = {styles.iconContainer}>
            <TouchableOpacity
              onPress = {()=>this.onAlipay()} 
              >
              <Image
                style={styles.stretch}
                source={require("../../../assets/images/alipay.jpg")}
              />
              <Text style={styles.titleText}>10L</Text>
            </TouchableOpacity>
        </View>
        <View style = {styles.iconContainer}>
            <TouchableOpacity
              onPress = {()=>this.onAlipay()} 
              >
              <Image
                style={styles.stretch}
                source={require("../../../assets/images/alipay.jpg")}
              />
              <Text style={styles.titleText}>15L</Text>
            </TouchableOpacity>
            {/* <Button
              title={`Alipay\nSimulation`}
              containerStyle={{ marginVertical: 10 }}
              
            /> */}
        </View>
        </View> 
        
        </ImageBackground>
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
  container: {
    flex:1,
    flexDirection: 'row'
  },
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
  stretch: {
    width: 200,
    height: 250,
    resizeMode: 'stretch'
  },
  titleText: {
    color: "black",
    textAlign: "center",
    fontSize: 30,
    fontFamily: "regular"
  },
  bgImage: {
    flex: 1,
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: "center",
    alignItems: "center"
  },
  iconContainer:{
    margin: 12,
    alignItems: "center"
  }
});