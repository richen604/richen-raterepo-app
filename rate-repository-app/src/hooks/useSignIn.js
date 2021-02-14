import { useMutation } from "@apollo/react-hooks";

import { AUTH_USER } from "../graphql/mutations";

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTH_USER);

  const signIn = async ({ username, password }) => {
    console.log("credentials in signin hook", { username, password });
    await mutate({
      variables: { credentials: { username, password } },
    });
  };

  return [signIn, result];
};

export default useSignIn;
