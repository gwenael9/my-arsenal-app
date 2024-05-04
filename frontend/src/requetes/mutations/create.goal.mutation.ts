import { gql } from "@apollo/client";

export const CREATE_GOAL = gql`
  mutation CreateGoal($infos: InputCreateGoal!) {
    createGoal(infos: $infos) {
      id
      buteur {
        id
        name
        country
      }
      passeur {
        id
        name
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
