import { gql } from "apollo-boost";
import { BASE_REPO } from "./fragments";
export const ALL_REPOS = gql`
  query getRepositories(
    $searchKeyword: String
    $orderDirection: OrderDirection
    $orderBy: AllRepositoriesOrderBy
  ) {
    repositories(
      searchKeyword: $searchKeyword
      orderDirection: $orderDirection
      orderBy: $orderBy
    ) {
      edges {
        node {
          ...BaseRepo
          createdAt
        }
      }
    }
  }
  ${BASE_REPO}
`;

export const GET_AUTH_USER = gql`
  query getAuthorizedUser($includeReviews: Boolean = false) {
    authorizedUser {
      id
      username
      reviews @include(if: $includeReviews) {
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
        }
      }
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
