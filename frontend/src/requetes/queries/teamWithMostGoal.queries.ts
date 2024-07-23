import { gql } from "@apollo/client";

export const TEAM_WITH_MOST_GOALS = gql`
  query GetTeamWithMostGoals($saison: String!, $buteurId: String) {
    getTeamWithMostGoals(saison: $saison, buteurId: $buteurId) {
      name
      goals
    }
  }
`;
