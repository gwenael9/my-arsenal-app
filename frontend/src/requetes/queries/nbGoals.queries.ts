import { gql } from "@apollo/client";

export const NUMBER_GOALS = gql`
  query NbGoals {
    nbGoals {
      ordre
      total
    }
  }
`;
