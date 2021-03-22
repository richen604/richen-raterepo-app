import { useContext, useEffect } from "react";
import { useHistory } from "react-router-native";
import { useApolloClient } from "@apollo/react-hooks";
import AuthStorageContext from "../contexts/AuthStorageContext";

const SignOut = () => {
  const apolloClient = useApolloClient();
  const authStorage = useContext(AuthStorageContext);
  const history = useHistory();

  useEffect(() => {
    const signOut = async () => {
      await authStorage.removeAccessToken();
      apolloClient.resetStore();
      history.push("/");
    };
    signOut();
  }, []);

  return null;
};

export default SignOut;
