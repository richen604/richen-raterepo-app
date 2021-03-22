import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { View, TouchableWithoutFeedback, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import Text from "../../components/Text";
import FormikTextInput from "../../components/FormikTextInput";
import theme from "../../theme";

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
        testID="usernameField"
        style={styles.input}
        name="username"
        placeholder="Username"
      />
      <FormikTextInput
        testID="passwordField"
        style={styles.input}
        name="password"
        placeholder="Password"
        secureTextEntry
      />
      <TouchableWithoutFeedback testID="submitButton" onPress={onSubmit}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Sign In</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const SignInForm = ({ onSubmit }) => {
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

describe("SignIn", () => {
  describe("SignInContainer", () => {
    it("calls onSubmit function with correct arguments when a valid form is submitted", async () => {
      // render the SignInContainer component, fill the text inputs and press the submit button
      const onSubmit = jest.fn();
      const { getByTestId } = render(<SignInForm onSubmit={onSubmit} />);

      fireEvent.changeText(getByTestId("usernameField"), "kalle");
      fireEvent.changeText(getByTestId("passwordField"), "password");
      fireEvent.press(getByTestId("submitButton"));

      await waitFor(() => {
        // expect the onSubmit function to have been called once and with a correct first argument
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: "kalle",
          password: "password",
        });
      });
    });
  });
});
