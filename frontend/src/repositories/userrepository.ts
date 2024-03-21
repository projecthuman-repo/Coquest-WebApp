import { map, from, Observable, of } from 'rxjs';
import { User } from '../models/usermodel';
import { request, gql } from 'graphql-request';
import { replaceNullsWithDefaults, toOutputFormat } from './common';

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

    fetchUser(id?: string): Observable<User> {
        if(id) {
            return from(
                request(process.env.REACT_APP_API!, fetchUserQuery, {"id": id})
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
            // TODO: have back-end return more meaningful data, then
            // rework this procedure to use the from(), pipe() pattern
            //
            // Retrieve data from JWT token
            const userInput: any = {
                "name": "tmp",
                "username": "tmp",
                "email": "tmp@email.com",
            };

            request(process.env.REACT_APP_API!, createUserMut, {
                "userInput": userInput
            })
            .then((data: any) => {
                console.log(data.createRegenquestUser);
                // TODO: get ID of newly created user
                // updateUser(...);
            })
            .catch(error => console.error(error))

            return of(new User(userInput));
        }
    }

    updateUser(user: User) {
        // TODO: only update the changed fields 
        request(process.env.REACT_APP_API!, updateUserMut, {
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
