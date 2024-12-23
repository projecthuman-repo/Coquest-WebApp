import { graphql } from "@/__generated__";

/*
 * To read more, go to ./example/gqlStringsExample.ts
 */

export const topicsQuery = graphql(`
	query GetTopics {
		options: getTopics {
			name
		}
	}
`);

export const motivesQuery = graphql(`
	query GetMotives {
		options: getMotives {
			name
		}
	}
`);

export const CREATE_USER_MUTATION = graphql(`
	mutation CreateUser($userInput: UserInput!) {
		createUser(userInput: $userInput) {
			code
			id
			response
		}
	}
`);

export const LOGIN_USER_MUTATION = graphql(`
	mutation LoginUser($userInput: LoginUserInput!) {
		loginUser(userInput: $userInput) {
			code
			id
			response
		}
	}
`);
