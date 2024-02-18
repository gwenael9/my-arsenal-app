import { gql } from "@apollo/client";

export const LIST_GOALS = gql`
    query Goals {
        goals {
            id
            player {
                id
                name
                country
            }
            link
            where
            date
            against
            ordre
        }
    }
`