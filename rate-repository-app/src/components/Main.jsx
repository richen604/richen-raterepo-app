import React from "react";
import { StyleSheet, View } from "react-native";
import { Route, Switch, Redirect } from "react-router-native";
import RepositoryList from "./RepositoryList";
import RepositoryPage from "./RepositoryPage";
import AppBar from "./AppBar";
import SignInForm from "./SignInForm";
import SignOut from "./SignOut";
import ReviewForm from "./ReviewForm";
import SignUpForm from "./SignUpForm";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: "#f4f6f6",
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Switch>
        <Route path="/" exact>
          <RepositoryList />
        </Route>
        <Route path="/login">
          <SignInForm />
        </Route>
        <Route path="/logout">
          <SignOut />
        </Route>
        <Route path="/repo/:id">
          <RepositoryPage />
        </Route>
        <Route path="/review">
          <ReviewForm />
        </Route>
        <Route path="/signup">
          <SignUpForm />
        </Route>
        <Redirect to="/" />
      </Switch>
    </View>
  );
};

export default Main;
