import { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";

import { ALL_REPOS } from "../graphql/queries";

const useRepositories = ({
  orderByParam,
  orderDirectionParam,
  debouncedSearch,
}) => {
  const [repositories, setRepositories] = useState();

  const getRepositories = useQuery(ALL_REPOS, {
    fetchPolicy: "cache-and-network",
    variables: {
      searchKeyword: debouncedSearch,
      orderBy: orderByParam || "CREATED_AT",
      orderDirection: orderDirectionParam || "DESC",
    },
  });

  const { called, networkStatus, loading, data, refetch } = getRepositories;

  useEffect(() => {
    if (called & (networkStatus > 6)) {
      const fetchedRepositories = data ? data.repositories : null;
      setRepositories(fetchedRepositories);
    }
  }, [getRepositories]);

  return { repositories, loading, refetch };
};

export default useRepositories;
