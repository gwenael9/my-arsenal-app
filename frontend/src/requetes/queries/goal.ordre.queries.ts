import { gql } from "@apollo/client";

// possible de trier, pas besoin de tout
export const GOAL_ORDRE = gql`
  query GetGoalByOrdre($goalOrdre: Float!) {
  getGoalByOrdre(goalOrdre: $goalOrdre) {
    id
    date
    against
    link
    ordre
    where
    competition
    saison
    buteur {
      id
      country
      firstname
      lastname
    }
    passeur {
      id
      country
      firstname
      lastname
    }
  }
}
`;
