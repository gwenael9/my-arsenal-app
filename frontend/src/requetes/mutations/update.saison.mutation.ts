import { gql } from "@apollo/client";

export const UPDATE_SAISON = gql`
  mutation UpdateSaisonMatch($newMatch: Float!, $saisonId: String!) {
    updateSaisonMatch(newMatch: $newMatch, saisonId: $saisonId) {
      id
      name
      match
      goals
    }
  }
`;
