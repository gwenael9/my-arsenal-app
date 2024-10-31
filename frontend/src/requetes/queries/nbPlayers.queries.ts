import { gql } from "@apollo/client";

export const NUMBER_PLAYERS = gql`
  query nbPlayers {
    nbPlayers
  }
`;
