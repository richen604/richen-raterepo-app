import { useQuery } from "@apollo/react-hooks";

import { ALL_REPOS } from "../graphql/queries";

const useRepositories = ({ orderBy, orderDirection, searchKeyword, first }) => {
  const variables = {
    searchKeyword,
    orderBy: orderBy || "CREATED_AT",
    orderDirection: orderDirection || "DESC",
    first,
  };

  const { data, loading, fetchMore, ...result } = useQuery(ALL_REPOS, {
    variables,
    fetchPolicy: "cache-and-network",
  });

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data && data.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      query: ALL_REPOS,
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
          repositories: {
            ...fetchMoreResult.repositories,
            edges: [
              ...previousResult.repositories.edges,
              ...fetchMoreResult.repositories.edges,
            ],
          },
        };

        return nextResult;
      },
    });
  };

  return {
    repositories: data ? data.repositories : undefined,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useRepositories;
