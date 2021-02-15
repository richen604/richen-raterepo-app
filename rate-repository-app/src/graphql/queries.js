import { gql } from "apollo-boost";
import { BASE_REPO } from "./fragments";
export const ALL_REPOS = gql`
  query getRepositories(
    $first: Int
    $after: String
    $searchKeyword: String
    $orderDirection: OrderDirection
    $orderBy: AllRepositoriesOrderBy
  ) {
    repositories(
      first: $first
      after: $after
      searchKeyword: $searchKeyword
      orderDirection: $orderDirection
      orderBy: $orderBy
    ) {
      edges {
        node {
          ...BaseRepo
          createdAt
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        totalCount
        hasNextPage
      }
    }
  }
  ${BASE_REPO}
`;

export const GET_AUTH_USER = gql`
  query getAuthorizedUser {
    authorizedUser {
      id
      username
    }
  }
`;

export const GET_REPO = gql`
  query getRepository($id: ID!) {
    repository(id: $id) {
      ...BaseRepo
      url
    }
  }
  ${BASE_REPO}
`;

export const GET_REVIEWS = gql`
  query getReviews($id: ID!, $first: Int, $after: String) {
    repository(id: $id) {
      id
      fullName
      reviews(first: $first, after: $after) {
        edges {
          node {
            id
            text
            rating
            createdAt
            repositoryId
            user {
              id
              username
            }
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          totalCount
          hasNextPage
        }
      }
    }
  }
`;
