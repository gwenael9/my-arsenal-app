import { gql } from "@apollo/client";

export const GET_USER_PROFILE = gql`
  query GetUserProfile {
    getUserProfile {
      email
    }
  }
`;
