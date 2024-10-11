import { graphql } from "@/__generated__";
/*
 * This file contains all the GraphQL queries and mutations used in the application.
 * This file is used by the GraphQL Code Generator to generate TypeScript types.
 */

/*
 * NOTE: If the generated type is unknown and no error is being thrown,
 * it is likely that the there is an error in a recent change you made. Try removing your changes
 * and see if the error persists. If it does not, then the error is likely in your changes.
 *
 * Otherwise, the schema may have changed and codegen is not throwing an error,
 * look for the recent changes in the schema manually and update the queries accordingly.
 *
 * Alternatively, remove a Query/Mutation one by one and rerun codegen
 * to find the operation that is causing the error.
 */
export const Queries = {
	GET_URL_AND_USERS: graphql(`
		query GetURLAndUser {
			generatePresignedURL
			getUsers {
				_id
			}
		}
	`),
};

export const Mutations = {
	DELETE_USER: graphql(`
		mutation CreateUser($userInput: UserInput!) {
			createUser(userInput: $userInput) {
				code
				id
				response
			}
		}
	`),
};
