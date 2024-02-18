import { gql } from "@apollo/client";

export const LIST_PLAYERS = gql`
    query Players {
        players {
            country
            id
            name
            goals {
                id
                link
                where
                date
                against
                ordre
            }
        }
    }
`