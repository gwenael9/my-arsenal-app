import { gql } from "@apollo/client";

export const NUMBER_GOALS = gql`
  query Query {
    nbGoals
  }
`;
