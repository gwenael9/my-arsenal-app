import { gql } from "@apollo/client";

export const GOALS_BY_SAISON = gql`
  query GetGoalsBySaison($saison: String!) {
    getGoalsBySaison(saison: $saison) {
      id
      date
      link
      against
      where
      ordre
      competition
      saison
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
    }
  }
`;
