import { gql } from "@apollo/client";

export const CREATE_PLAYER = gql`
  mutation createPlayer($infos: InputCreatePlayer!) {
  createPlayer(infos: $infos) {
    id
    name
    country
    goals {
      id
      date
      against
      ordre
      where
      link
    }
  }
}
`;
