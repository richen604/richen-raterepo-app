import { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";

import { GET_AUTH_USER } from "../graphql/queries";

const useAuthUser = () => {
  const [authUser, setAuthUser] = useState(null);
  const getAuthUser = useQuery(GET_AUTH_USER, {
    fetchPolicy: "cache-and-network",
  });

  const { called, networkStatus, loading, data, refetch } = getAuthUser;

  useEffect(() => {
    if (called & (networkStatus > 6)) {
      const result = data ? data.authorizedUser : null;
      setAuthUser(result);
    }
  }, [getAuthUser]);

  return { authUser, loading, refetch };
};

export default useAuthUser;
