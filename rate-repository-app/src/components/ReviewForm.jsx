import React from "react";
import { View, TouchableWithoutFeedback, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import Text from "./Text";
import FormikTextInput from "./FormikTextInput";
import theme from "../theme";
import useReview from "../hooks/useReview";

const validationSchema = yup.object().shape({
  repoOwnerName: yup.string().required("Repository Owner Name is required"),
  repoName: yup.string().required("Repository Name is required"),
  ratingInput: yup
    .number()
    .required("Rating is required")
    .min(0)
    .max(100)
    .typeError("Rating must be a number"),
  review: yup.string().notRequired(),
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
    textAlignVertical: "top",
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
  repoOwnerName: "",
  repoName: "",
  ratingInput: null,
  review: "",
};

const ReviewFormik = ({ onSubmit }) => {
  return (
    <View style={styles.formContainer}>
      <FormikTextInput
        style={styles.input}
        name="repoOwnerName"
        placeholder="Repository Owner Name"
      />
      <FormikTextInput
        style={styles.input}
        name="repoName"
        placeholder="Repository Name"
      />
      <FormikTextInput
        style={styles.input}
        name="ratingInput"
        placeholder="Rating Between 0 - 100"
      />
      <FormikTextInput
        style={styles.input}
        name="review"
        placeholder="Review"
        multiline
      />
      <TouchableWithoutFeedback onPress={onSubmit}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Sign In</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default function ReviewForm() {
  const [createReview] = useReview();
  const onSubmit = async (values) => {
    const { repoOwnerName, repoName, ratingInput, review } = values;

    try {
      await createReview({ repoOwnerName, repoName, ratingInput, review });
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
        {({ handleSubmit }) => <ReviewFormik onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
}
