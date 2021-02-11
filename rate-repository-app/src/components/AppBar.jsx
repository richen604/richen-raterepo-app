import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import Constants from "expo-constants";
import AppBarTab from "./AppBarTab";
import { Link } from "react-router-native";

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#24292e",
    padding: 5,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <Link to="/">
        <AppBarTab name="Repositories" />
      </Link>
      <Link to="/login">
        <AppBarTab name="Sign In" />
      </Link>
    </View>
  );
};

<TouchableWithoutFeedback>
  <AppBar />
</TouchableWithoutFeedback>;

export default AppBar;
