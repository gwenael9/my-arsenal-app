import { gql } from "@apollo/client";

export const DELETE_PLAYER = gql`
  mutation DeletePlayer($deletePlayerId: String!) {
  deletePlayer(id: $deletePlayerId) {
    message
    success
  }
}
`;
