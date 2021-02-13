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
