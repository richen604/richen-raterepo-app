import React from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import Constants from "expo-constants";
import AppBarTab from "./AppBarTab";
import { Link } from "react-router-native";
import useAuthUser from "../hooks/useAuthUser";

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
  const { authUser } = useAuthUser();
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/">
          <AppBarTab name="Repositories" />
        </Link>
        {authUser === null && (
          <>
            <Link to="/login">
              <AppBarTab name="Sign In" />
            </Link>
            <Link to="/signup">
              <AppBarTab name="Sign Up" />
            </Link>
          </>
        )}
        {authUser && (
          <>
            <Link to="/review">
              <AppBarTab name="Create a Review" />
            </Link>
            <Link to="/logout">
              <AppBarTab name="Sign Out" />
            </Link>
          </>
        )}
      </ScrollView>
    </View>
  );
};

<TouchableWithoutFeedback>
  <AppBar />
</TouchableWithoutFeedback>;

export default AppBar;
