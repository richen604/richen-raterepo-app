import { gql } from "apollo-boost";

export const BASE_REPO = gql`
  fragment BaseRepo on Repository {
    id
    fullName
    description
    language
    forksCount
    stargazersCount
    ratingAverage
    reviewCount
    ownerAvatarUrl
  }
`;
