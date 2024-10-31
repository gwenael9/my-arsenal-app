import { gql } from "@apollo/client";

export const LIST_PLAYERS = gql`
    query Players {
        players {
            country
            id
            firstname
            lastname
            goals {
                id
                link
                where
                date
                against
                ordre
                competition
                saison
                buteur {
                    id
                    country
                    firstname
                    lastname
                }
            }
            passes {
                id
                link
                where
                date
                against
                ordre
                competition
                saison
                buteur {
                    id
                    country
                    firstname
                    lastname
                }
            }
        }
    }
`