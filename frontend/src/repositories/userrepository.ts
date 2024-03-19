import { map, from, Observable, BehaviorSubject } from 'rxjs';
import { User, UserOptional, UserRequired } from '../models/usermodel';
import { request, gql } from 'graphql-request';
import { toOutputFormat } from './common';

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

    // TODO: Find a way to generalize this function
    private toOutputFormat(user: User): any {
        let copy: any = { ...user };

        copy.registered = toOutputFormat(copy.registered);

        if(copy.communities.length > 0) {
            copy.communities = copy.communities.map(toOutputFormat);
        } else {
            copy.communities = null;
        }

        return copy;
    }

    fetchUser(id: string): Observable<User> {
        if(id) {
            return from(
                request(process.env.REACT_APP_API!, fetchUserQuery, {"id": id})
            ).pipe(
                map((data: any): User => {
                    let res = data.findUserbyID as User;
                    this.user = res;
                    updateUserSub(res);
                    return res;
                })
            );
        } else {
            // Retrieve data from JWT token
            request(process.env.REACT_APP_API!, createUserMut, {
                "userInput": {
                    "name": "tmp",
                    "username": "tmp",
                    "email": "tmp@email.com",
                }
            })
            .then((data: any) => {
                console.log(data.createRegenquestUser);
                // TODO: get ID of newly created user
                // updateUser(...);
            })
            .catch(error => console.error(error))
    
            return userModelSubject.asObservable();
        }
    }

    updateUser(user: User) {
        // TODO: only update the changed fields 
        request(process.env.REACT_APP_API!, updateUserMut, {
            userInput: this.toOutputFormat(user)
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

// TODO: Decouple Subject and free helper function from this module and place them in the userobservable module
export function updateUserSub(updatedUserData: Partial<UserRequired> & Partial<UserOptional>) {
    const { id, ...rest } = userModelSubject.value;
    const userModel = new User({ _id: id, ...rest, ...updatedUserData });
    // Notify subscribers by emitting the updated User instance
    userModelSubject.next(userModel);
}

// Initialize userModel as the initial value for BehaviorSubject
export const userModelSubject = new BehaviorSubject<User>(new User());
