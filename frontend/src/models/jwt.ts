import graphQLClient from "../apiInterface/client";
import { gql } from "graphql-request";
import { Name, User } from "./usermodel";

export type JWT = {
	name: Name;
	username: string;
	email: string;
	iat: string;
	exp: string;
	sub: string;
};

const getCrossUserQuery = gql`
	query FindCrossUser($email: String) {
		findCrossUser(email: $email) {
			id: regenquestUserId
		}
	}
`;

const getTokenQuery = gql`
	query GetToken {
		getToken {
			name {
				first
				last
			}
			username
			email
			iat
			exp
			sub
		}
	}
`;

// Constructs a new user instance using the custom claims from the JWT token
// and the `regenquestUserId` property from the associating CrossPlatform.user document
export async function getUserFromJWT(): Promise<User> {
	const { getToken: token }: any = await graphQLClient.request(getTokenQuery);
	const { findCrossUser: crossUser }: any = await graphQLClient.request(
		getCrossUserQuery,
		{ email: token.email },
	);
	return new User({
		_id: crossUser.id ?? undefined,
		email: token.email,
		name: token.name,
		username: token.username,
	});
}
