import { gql } from "graphql-request";

export const topicsQuery = gql`
    query GetTopics {
        options: getTopics {
            name
        }
    }
`;

export const motivesQuery = gql`
    query GetMotives {
        options: getMotives {
            name
        }
    }
`;
