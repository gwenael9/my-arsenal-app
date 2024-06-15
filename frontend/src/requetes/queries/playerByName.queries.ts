import { gql } from "@apollo/client";

export const PLAYER_NAME = gql`
  query GetPlayerByName($playerName: String!) {
    getPlayerByName(playerName: $playerName) {
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
