import { BehaviorSubject } from 'rxjs';
import { User, UserOptional, UserRequired } from '../models/usermodel';
import { userRepository } from '../repositories/userrepository';

// TODO: convert into a singleton that examines the claims in the JWT
export const userObservable = userRepository.fetchUser("65f34816fa6022357f6513b1");

// Initialize userModel as the initial value for BehaviorSubject
export const userModelSubject = new BehaviorSubject<User>(new User());

export function updateUserSub(updatedUserData: Partial<UserRequired> & Partial<UserOptional>) {
    // On first call, userModelSubject.value.id will be "", because it was managing a temporary empty object on instatiation. See line 9.
    let id = userModelSubject.value.id ?? updatedUserData._id;
    const userModel = new User({ _id: id, ...userModelSubject.value, ...updatedUserData });
    // Notify subscribers by emitting the updated User instance
    userModelSubject.next(userModel);
}

userObservable.subscribe({
    next: (value) => updateUserSub({ _id: value.id, ...value }),
    // Stop subscribing after the first next callback call as userModelSubject is now initialized
    complete: () => true,
})
