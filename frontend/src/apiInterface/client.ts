import { GraphQLClient } from "graphql-request";

const graphQLClient = new GraphQLClient(import.meta.env.VITE_API!, {
	// Add cookies to cross-origin APIs
	credentials: "include",
	method: "POST",
});

export default graphQLClient;
