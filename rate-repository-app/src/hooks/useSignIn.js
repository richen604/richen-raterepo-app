import { useMutation, useApolloClient } from "@apollo/react-hooks";

import { AUTH_USER } from "../graphql/mutations";
import { useContext } from "react";
import { useHistory } from "react-router-native";

import AuthStorageContext from "../contexts/AuthStorageContext";

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTH_USER);
  const apolloClient = useApolloClient();
  const authStorage = useContext(AuthStorageContext);
  const history = useHistory();

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({
      variables: { credentials: { username, password } },
    });
    await authStorage.setAccessToken(data.authorize.accessToken);
    apolloClient.resetStore();
    history.push("/");
  };

  return [signIn, result];
};

export default useSignIn;
