import { gql } from "@apollo/client";

export const GOALS_BY_SAISON_AND_PLAYER_ID = gql`
  query GetGoalsBySaisonAndPlayerId(
    $type: String!
    $playerId: String!
    $saison: String!
  ) {
    getGoalsBySaisonAndPlayerId(
      type: $type
      playerId: $playerId
      saison: $saison
    ) {
      id
      date
      link
      against
      where
      ordre
      competition
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
      saison
    }
  }
`;
