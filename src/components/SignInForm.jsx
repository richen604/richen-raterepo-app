import React from "react";
import { View, TouchableWithoutFeedback, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import Text from "./Text";
import FormikTextInput from "./FormikTextInput";
import theme from "../theme";
import useSignIn from "../hooks/useSignIn";

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const styles = StyleSheet.create({
  background: {
    backgroundColor: theme.colors.background,
    height: "100%",
  },
  formContainer: {
    backgroundColor: "#FFFFFF",
    margin: 10,
    borderRadius: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  input: {
    margin: 10,
    padding: 15,
    width: "80%",
    height: 50,
    borderRadius: 5,
    borderStyle: "solid",
    borderColor: theme.colors.textSecondary,
    borderWidth: 1,
  },
  button: {
    marginTop: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    height: 40,
    backgroundColor: "#0366d6",
    borderRadius: 5,
  },
  buttonText: {
    color: "#FFFFFF",
  },
});

const initialValues = {
  username: "",
  password: "",
};

const SignInFormik = ({ onSubmit }) => {
  return (
    <View style={styles.formContainer}>
      <FormikTextInput
        style={styles.input}
        name="username"
        placeholder="Username"
      />
      <FormikTextInput
        style={styles.input}
        name="password"
        placeholder="Password"
        secureTextEntry
      />
      <TouchableWithoutFeedback onPress={onSubmit}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Sign In</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const SignInForm = () => {
  const [signIn] = useSignIn();
  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signIn({ username, password });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View style={styles.background}>
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        {({ handleSubmit }) => <SignInFormik onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};

export default SignInForm;
