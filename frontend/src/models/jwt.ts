import graphQLClient from '../apiInterface/client';
import { gql } from 'graphql-request';
import { Cookies } from 'react-cookie';
import { decodeToken } from 'react-jwt'
import { User } from './usermodel';

export type JWT = {
    name: string,
    username: string,
    email: string,
    iat: string,
    exp: string,
    sub: string,
}

const getCrossUserQuery = gql`
    query Query($email: String) {
        findCrossUser(email: $email) {
            id: regenquestUserId
        }
    }
`;

const getTokenQuery = gql`
    query GetToken {
        getToken {
            name
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
    let {getToken: token}: any = await graphQLClient.request(getTokenQuery);
    const {findCrossUser: crossUser}: any = await graphQLClient.request(getCrossUserQuery, {'email': token.email});
    return new User({_id: crossUser.id ?? undefined, email: token.email, name: token.name, username: token.username});
}

