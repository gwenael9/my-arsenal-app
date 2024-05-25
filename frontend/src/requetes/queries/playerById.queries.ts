import { gql } from "@apollo/client";

export const PLAYER_BY_ID = gql`
  query GetPlayerById($playerId: String!) {
    getPlayerById(playerId: $playerId) {
      firstname
      lastname
    }
  }
`;
