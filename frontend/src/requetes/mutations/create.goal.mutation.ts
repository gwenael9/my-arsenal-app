import { gql } from "@apollo/client";

export const CREATE_GOAL = gql`
  mutation CreateGoal($infos: InputCreateGoal!) {
    createGoal(infos: $infos) {
      id
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
      date
      against
      ordre
      where
      link
    }
  }
`;
