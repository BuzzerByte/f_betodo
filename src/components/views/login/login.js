import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Dimensions,
  LayoutAnimation,
  UIManager,
  KeyboardAvoidingView,
  AsyncStorage,
  SafeAreaView,
  ScrollView,
  StatusBar
} from "react-native";
// import AsyncStorage from '@react-native-community/async-storage';
import { Input, Button, Icon } from "react-native-elements";
import axios from "axios";
// import { login } from "../../../actions/UserActions";
// import { connect, useSelector, useDispatch } from "react-redux";
// import { saveUserToken } from "../../../actions/TokenAction";
import UserController from '../../../controllers/UserController';
const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const BG_IMAGE = require("../../../assets/images/bg_screen.jpg");

// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const TabSelector = ({ selected }) => {
  return (
    <View style={styles.selectorContainer}>
      <View style={selected && styles.selected} />
    </View>
  );
};

TabSelector.propTypes = {
  selected: PropTypes.bool.isRequired
};

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      fontLoaded: false,
      selectedCategory: 0,
      isLoading: false,
      isEmailValid: true,
      isPasswordValid: true,
      isConfirmationValid: true,
      userData: ""
    };
    this.selectCategory = this.selectCategory.bind(this);
    this.login = this.login.bind(this);
    this.signUp = this.signUp.bind(this);
  }

  componentDidMount() {
    const { userData } = this.state;
    // this.getToken();
    // const token = await AsyncStorage.getItem('userData');
    let data = this.getToken().then(data => {
      // console.log("Token: "+ data);
      this.setState({
        userData: data
      });
      // if (data !== null) {
      //   console.log("sign in");
      //   this.props.navigation.navigate("App");
      // } else {
      //   console.log("still need to log in");
      // }
    });
    this.setState({ fontLoaded: true });
    // this.removeItemValue("userData");
  }
  
  async storeToken(user) {
    try {
      // console.log(user);
      UserController.saveUserToken("userToken",user);
      // await AsyncStorage.setItem("userData", user);
      // console.log("token stored:"+user);
    } catch (error) {
      console.log("Somehting went wrong", error);
    }
  }

  async getToken() {
    try {
      const token = UserController.getUserToken();

      return token;
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }

  selectCategory(selectedCategory) {
    LayoutAnimation.easeInEaseOut();
    this.setState({
      selectedCategory,
      isLoading: false
    });
  }

  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(email);
  }

  login = async () => {
    const { email, password } = this.state;
    this.setState({ isLoading: true });
    // const token = await this.props.login(email, password);
    const token = await UserController.login(email, password);
    console.log(token);
    if(token != null){
      UserController.saveUserToken(token);
      this.props.navigation.navigate("App");
    }
    setTimeout(() => {
      LayoutAnimation.easeInEaseOut();
      this.setState({
        isLoading: false,
        isEmailValid: this.validateEmail(email) || this.emailInput.shake(),
        isPasswordValid: password.length >= 8 || this.passwordInput.shake()
      });
    }, 1500);
  };

  signUp = async () => {
    const { email, password, passwordConfirmation } = this.state;
    this.setState({ isLoading: true });
    const token = await UserController.signup(email, password, passwordConfirmation);
    if(token != null){
      UserController.saveUserToken(token);
      this.props.navigation.navigate("App");
    }
    // Simulate an API call
    setTimeout(() => {
      LayoutAnimation.easeInEaseOut();
      this.setState({
        isLoading: false,
        isEmailValid: this.validateEmail(email) || this.emailInput.shake(),
        isPasswordValid: password.length >= 8 || this.passwordInput.shake(),
        isConfirmationValid:
          password === passwordConfirmation || this.confirmationInput.shake()
      });
    }, 1500);
  }

  render() {
    const {
      selectedCategory,
      isLoading,
      isEmailValid,
      isPasswordValid,
      isConfirmationValid,
      email,
      password,
      passwordConfirmation
    } = this.state;
    const isLoginPage = selectedCategory === 0;
    const isSignUpPage = selectedCategory === 1;

    return (
      <View style={styles.container}>
        <ImageBackground source={BG_IMAGE} style={styles.bgImage}>
          {this.state.fontLoaded ? (
            <View>
              <KeyboardAvoidingView
                contentContainerStyle={styles.loginContainer}
                behavior="position"
              >
                <View style={styles.titleContainer}>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.titleText}>Be-aware</Text>
                  </View>
                  <View style={{ marginTop: -10, marginLeft: 10 }}>
                    <Text style={styles.titleText}>always-Todo</Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Button
                    disabled={isLoading}
                    type="clear"
                    activeOpacity={0.7}
                    onPress={() => this.selectCategory(0)}
                    containerStyle={{ flex: 1 }}
                    titleStyle={[
                      styles.categoryText,
                      isLoginPage && styles.selectedCategoryText
                    ]}
                    title={"Login"}
                  />
                  <Button
                    disabled={isLoading}
                    type="clear"
                    activeOpacity={0.7}
                    onPress={() => this.selectCategory(1)}
                    containerStyle={{ flex: 1 }}
                    titleStyle={[
                      styles.categoryText,
                      isSignUpPage && styles.selectedCategoryText
                    ]}
                    title={"Sign up"}
                  />
                </View>
                <View style={styles.rowSelector}>
                  <TabSelector selected={isLoginPage} />
                  <TabSelector selected={isSignUpPage} />
                </View>
                <View style={styles.formContainer}>
                  <Input
                    leftIcon={
                      <Icon
                        name="envelope-o"
                        type="font-awesome"
                        color="rgba(0, 0, 0, 0.38)"
                        size={25}
                        style={{ backgroundColor: "transparent" }}
                      />
                    }
                    value={email}
                    keyboardAppearance="light"
                    autoFocus={false}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                    returnKeyType="next"
                    inputStyle={{ marginLeft: 10 }}
                    placeholder={"Email"}
                    containerStyle={{
                      borderBottomColor: "rgba(0, 0, 0, 0.38)"
                    }}
                    ref={input => (this.emailInput = input)}
                    onSubmitEditing={() => this.passwordInput.focus()}
                    onChangeText={email => this.setState({ email })}
                    errorMessage={
                      isEmailValid ? null : "Please enter a valid email address"
                    }
                  />
                  <Input
                    leftIcon={
                      <Icon
                        name="lock"
                        type="simple-line-icon"
                        color="rgba(0, 0, 0, 0.38)"
                        size={25}
                        style={{ backgroundColor: "transparent" }}
                      />
                    }
                    value={password}
                    keyboardAppearance="light"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                    returnKeyType={isSignUpPage ? "next" : "done"}
                    blurOnSubmit={true}
                    containerStyle={{
                      marginTop: 16,
                      borderBottomColor: "rgba(0, 0, 0, 0.38)"
                    }}
                    inputStyle={{ marginLeft: 10 }}
                    placeholder={"Password"}
                    ref={input => (this.passwordInput = input)}
                    onSubmitEditing={() =>
                      isSignUpPage
                        ? this.confirmationInput.focus()
                        : this.login()
                    }
                    onChangeText={password => this.setState({ password })}
                    errorMessage={
                      isPasswordValid
                        ? null
                        : "Please enter at least 8 characters"
                    }
                  />
                  {isSignUpPage && (
                    <Input
                      icon={
                        <Icon
                          name="lock"
                          type="simple-line-icon"
                          color="rgba(0, 0, 0, 0.38)"
                          size={25}
                          style={{ backgroundColor: "transparent" }}
                        />
                      }
                      value={passwordConfirmation}
                      secureTextEntry={true}
                      keyboardAppearance="light"
                      autoCapitalize="none"
                      autoCorrect={false}
                      keyboardType="default"
                      returnKeyType={"done"}
                      blurOnSubmit={true}
                      containerStyle={{
                        marginTop: 16,
                        borderBottomColor: "rgba(0, 0, 0, 0.38)"
                      }}
                      inputStyle={{ marginLeft: 10 }}
                      placeholder={"Confirm password"}
                      ref={input => (this.confirmationInput = input)}
                      onSubmitEditing={this.signUp}
                      onChangeText={passwordConfirmation =>
                        this.setState({ passwordConfirmation })
                      }
                      errorMessage={
                        isConfirmationValid
                          ? null
                          : "Please enter the same password"
                      }
                    />
                  )}
                  <Button
                    buttonStyle={styles.loginButton}
                    containerStyle={{ marginTop: 32, flex: 0 }}
                    activeOpacity={0.8}
                    title={isLoginPage ? "LOGIN" : "SIGN UP"}
                    onPress={isLoginPage ? this.login : this.signUp}
                    titleStyle={styles.loginTextButton}
                    loading={isLoading}
                    disabled={isLoading}
                  />
                </View>
              </KeyboardAvoidingView>
              <View style={styles.helpContainer}>
                <Button
                  title={"Need help ?"}
                  titleStyle={{ color: "white" }}
                  buttonStyle={{ backgroundColor: "transparent" }}
                  underlayColor="transparent"
                  onPress={() => console.log("Account created")}
                />
              </View>
            </View>
          ) : (
            <Text>Loading...</Text>
          )}
        </ImageBackground>
      </View>
    );
  }
}

// const mapStateToProps = state => ({
//   token:state.token,
  
// });

// const mapDispatchToProps = dispatch => ({
//   // getUserToken: ()=> dispatch(getUserToken()),
//   login: (email,password) => dispatch(login(email, password)),
//   saveUserToken: (token) => dispatch(saveUserToken(token))
// });

// export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rowSelector: {
    height: 20,
    flexDirection: "row",
    alignItems: "center"
  },
  selectorContainer: {
    flex: 1,
    alignItems: "center"
  },
  selected: {
    position: "absolute",
    borderRadius: 50,
    height: 0,
    width: 0,
    top: -5,
    borderRightWidth: 70,
    borderBottomWidth: 70,
    borderColor: "white",
    backgroundColor: "white"
  },
  loginContainer: {
    alignItems: "center",
    justifyContent: "center"
  },
  loginTextButton: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold"
  },
  loginButton: {
    backgroundColor: "rgba(232, 147, 142, 1)",
    borderRadius: 10,
    height: 50,
    width: 200
  },
  titleContainer: {
    height: 150,
    backgroundColor: "transparent",
    justifyContent: "center"
  },
  formContainer: {
    backgroundColor: "white",
    width: SCREEN_WIDTH - 30,
    borderRadius: 10,
    paddingTop: 32,
    paddingBottom: 32,
    alignItems: "center"
  },
  loginText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white"
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
  categoryText: {
    textAlign: "center",
    color: "white",
    fontSize: 24,
    fontFamily: "light",
    backgroundColor: "transparent",
    opacity: 0.54
  },
  selectedCategoryText: {
    opacity: 1
  },
  titleText: {
    color: "white",
    fontSize: 30,
    fontFamily: "regular"
  },
  helpContainer: {
    height: 64,
    alignItems: "center",
    justifyContent: "center"
  }
});
