import React, { useEffect } from "react";
import { View, StyleSheet, AsyncStorage } from "react-native";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import getUser from "../../selectors/UserSelectors";
import Colors from "../../helpers/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white
  }
});

function AuthHandler(props) {
  // const user = useSelector(state => getUser(state));

  useEffect(() => {
    AsyncStorage.getItem("userData", (err, value) => {
      const user = value;
      console.log(user);
      if (user !== null) {
        console.log("go to app" + user);
        // AsyncStorage.removeItem("userData");
        props.navigation.navigate("App");
      } else {
        console.log("got to auth");
        props.navigation.navigate("Auth");
      }
    });
  });

  return <View style={styles.container} />;
}

AuthHandler.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default AuthHandler;
