import { gql } from "@apollo/client";

export const LIST_GOALS = gql`
  query Goals {
    goals {
      id
      buteur {
        id
        firstname
        lastname
        country
      }
      passeur {
        id
        firstname
        lastname
        country
      }
      link
      where
      date
      against
      ordre
      competition
      saison
    }
  }
`;
