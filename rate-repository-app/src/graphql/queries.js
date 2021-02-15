import { gql } from "apollo-boost";
import { BASE_REPO } from "./fragments";
export const ALL_REPOS = gql`
  query getRepositories {
    repositories {
      edges {
        node {
          ...BaseRepo
        }
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
  query getReviews($id: ID!) {
    repository(id: $id) {
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
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
