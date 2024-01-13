import { gql } from "@apollo/client";

export const LIST_PLAYERS = gql`
    query Players {
        players {
            id
            name
            age
            country
            number
            goals {
                id
                date
                link
            }
        }
    }
`