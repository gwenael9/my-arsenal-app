import { gql } from "@apollo/client";

export const GOALS_BY_PLAYER_ID = gql`
  query GetGoalsByPlayerId($type: String!, $playerId: String!) {
  getGoalsByPlayerId(type: $type, playerId: $playerId) {
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
  }
}
`;
