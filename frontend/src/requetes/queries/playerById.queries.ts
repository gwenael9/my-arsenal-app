import { gql } from "@apollo/client";

export const PLAYER_BY_ID = gql`
  query GetPlayerById($playerId: String!) {
  getPlayerById(playerId: $playerId) {
    id
    firstname
    lastname
    country
    goals {
      id
      date
      link
      against
      where
      ordre
      competition
      saison
    }
    passes {
      id
      date
      link
      against
      where
      ordre
      competition
      saison
    }
  }
}
`;
