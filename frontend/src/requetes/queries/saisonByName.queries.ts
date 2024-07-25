import { gql } from "@apollo/client";

export const SAISON_BY_NAME = gql`
  query SaisonByName($name: String!) {
    saisonByName(name: $name) {
      id
      name
      match
      goals
    }
  }
`;
