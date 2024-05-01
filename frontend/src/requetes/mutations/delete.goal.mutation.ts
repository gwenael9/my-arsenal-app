import { gql } from "@apollo/client";

export const DELETE_GOAL = gql`
  mutation DeleteGoal($deleteGoalId: String!) {
  deleteGoal(id: $deleteGoalId) {
    message
    success
  }
}
`;
