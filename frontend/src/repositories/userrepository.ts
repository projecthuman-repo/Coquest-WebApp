import { map, from, Observable, of } from 'rxjs';
import { User } from '../models/usermodel';
import { gql } from 'graphql-request';
import { replaceNullsWithDefaults, replaceUndefinedWithNulls, toOutputFormat } from './common';
import graphQLClient from '../apiInterface/client';

const fetchUserQuery = gql`
    query Query($id: String) {
        findUserbyID(id: $id) {
            userID
            name
            username
            email
            location {
            lat
            lng
            }
            biography
            registered {
                type: __typename
                ... on bool {
                    boolValue
                }
                ... on int {
                    numValue
                }
            }
            communities {
                type: __typename
                ... on string {
                    strValue
                }
            }
            _id
            motives
            topics
            currentLevel
            images {
                contentType
                path
            }
            skills {
                skillName
                skillLevel
            }
            badges {
                badgeName
                badgeDescription
            }
            recommendations {
                name
                comment
            }
        }
    }
    `;

const createUserMut = gql`
    mutation CreateRegenquestUser($userInput: regenquestUserInput) {
        createRegenquestUser(userInput: $userInput) {
            code
            response
            id
        }
    }
`;

const updateUserMut = gql`
    mutation UpdateRegenquestUser($userInput: regenquestUserInput) {
        updateRegenquestUser(userInput: $userInput) {
            code
            response
        }
    }
`;

class UserRepository {
    private user: User;

    fetchUser(inputUser: User): Observable<User> {
        if(inputUser.isValid()) {
            return from(
                graphQLClient.request(fetchUserQuery, {"id": inputUser.id})
            ).pipe(
                map((data: any): User => {
                    this.user = new User(data.findUserbyID);

                    // Because we fetch all the User data,
                    // there is no lack of data as defined in this Stackoverflow post: https://stackoverflow.com/questions/1626597/should-functions-return-null-or-an-empty-object
                    // Thus, we should remove all `null`s and replace it with some valid data.
                    const res: User = replaceNullsWithDefaults(this.user);
                    return res;
                })
            );
        } else {
            return from(
                graphQLClient.request(createUserMut, {"userInput": toOutputFormat(inputUser)})
            ).pipe(
                map((data: any): User => {
                    // New users lack most data, so we must replace unassigned fields with null to
                    // match the data in the DB after a successful insert.
                    //
                    // Note: must overwrite current level to ensure the user is now in a valid state.
                    this.user = new User(replaceUndefinedWithNulls({_id: data.createRegenquestUser.id, ...inputUser, currentLevel: 0}));

                    const res: User = replaceNullsWithDefaults(this.user);
                    return res;
                })
            );
        }
    }

    updateUser(user: User) {
        // TODO: only update the changed fields 
        graphQLClient.request(updateUserMut, {
            userInput: toOutputFormat(user)
        })
        .then((res: any) => {
            console.log(res);
            this.user = user;
        })
        .catch(error => console.error(error));
    }

    constructor() {
        this.user = new User();
    }
}

export const userRepository: UserRepository = new UserRepository();
