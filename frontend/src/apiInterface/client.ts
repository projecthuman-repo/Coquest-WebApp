import { GraphQLClient } from "graphql-request";

const graphQLClient = new GraphQLClient(process.env.REACT_APP_API!, {
    // Add cookies to cross-origin APIs
    credentials: 'include',
    method: 'POST',
});

export default graphQLClient;
