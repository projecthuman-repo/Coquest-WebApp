import { userRepository } from '../repositories/userrepository';

// Convert into a singleton that examines the claims in the JWT
export const userObservable = userRepository.fetchUser("65f34816fa6022357f6513b1");
