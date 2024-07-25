import { gql } from "@apollo/client";

export const LIST_SAISONS = gql`
  query Saisons {
    saisons {
      id
      name
      match
      goals
    }
  }
`;
