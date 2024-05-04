import { gql } from "@apollo/client";

export const LIST_GOALS = gql`
    query Goals {
        goals {
            id
            buteur {
                id
                name
                country
            }
            passeur {
                id
                name
                country
            }
            link
            where
            date
            against
            ordre
            competition
        }
    }
`