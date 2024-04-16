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

// Constructs a new user instance using the custom claims from the JWT token
// and the `regenquestUserId` property from the associating CrossPlatform.user document
export async function getUserFromJWT(): Promise<User> {
    // TODO: move cookie parsing logic to the back-end
    const phcCookie = new Cookies().get(process.env.REACT_APP_JWT_COOKIE!);
    const token: JWT | null = decodeToken(phcCookie);

    if(!token) {
        throw new Error(`Invalid token in the '${process.env.REACT_APP_JWT_TOKEN}' cookie`);
    }

    const crossUser: any = await graphQLClient.request(getCrossUserQuery, {'email': token.email});
    return new User({_id: crossUser.findCrossUser.id ?? undefined, email: token.email, name: token.name, username: token.username});
}

