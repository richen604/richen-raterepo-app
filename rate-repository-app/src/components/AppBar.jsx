import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import Constants from "expo-constants";
import AppBarTab from "./AppBarTab";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    display: "flex",
    flexDirection: "row",
    margin: 25,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    backgroundColor: "#24292e",
    paddingBottom: 0,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTab name="Repositories" />
    </View>
  );
};

<TouchableWithoutFeedback>
  <AppBar />
</TouchableWithoutFeedback>;

export default AppBar;
