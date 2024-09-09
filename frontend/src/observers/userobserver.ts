import { BehaviorSubject, firstValueFrom } from "rxjs";
import { User, UserOptional, UserRequired } from "../models/usermodel";
import Repository from "../repositories/repository";
import { getUserFromJWT } from "../models/jwt";

export class UserModelSubject {
	private static instancePromise: Promise<UserModelSubject> | null = null;
	private static cache: User | null = null;
	readonly sub: BehaviorSubject<User>;

	private constructor(userParams: UserRequired & Partial<UserOptional>) {
		// Initialize userModel as the initial value for BehaviorSubject
		this.sub = new BehaviorSubject<User>(new User(userParams));
	}

	update(updatedUserData: Partial<UserRequired> & Partial<UserOptional>) {
		// On first call, userModelSubject.value.id will be "", because it was managing a temporary empty object on instatiation. See line 9.
		const id = this.sub.value.id ?? updatedUserData._id;
		const userModel = new User({
			_id: id,
			...this.sub.value,
			...updatedUserData,
		});
		// Notify subscribers by emitting the updated User instance
		this.sub.next(userModel);
	}

	private static saveCacheToLocalStorage(userData: User) {
		localStorage.setItem("userCache", JSON.stringify(userData));
	}

	private static loadCacheFromLocalStorage(): User | null {
		const cachedData = localStorage.getItem("userCache");
		return cachedData ? (JSON.parse(cachedData) as User) : null;
	}

	private static async fetchUserData(): Promise<User> {
		const cachedData = this.loadCacheFromLocalStorage();
		// Check cache first
		if (cachedData) {
			console.log("Using cached user data");
			return cachedData;
		}

		// Fetch user data from the server
		const jwtUser = await getUserFromJWT();
		console.log("Retrieved JWT:", jwtUser);

		const userData = await firstValueFrom(
			Repository.getInstance("User", User).fetch(
				jwtUser,
				{ currentLevel: 0 },
				{
					expand: JSON.stringify({
						regenquestUser: [{ communities: ["members"] }],
					}),
				},
			),
		);

		// Cache the fetched data
		this.saveCacheToLocalStorage(userData);

		return userData;
	}

	private static async getInitialInstance(): Promise<UserModelSubject> {
		try {
			const userData = await this.fetchUserData();
			return new UserModelSubject({ _id: userData.id, ...userData });
		} catch (error) {
			console.error(
				"Error fetching initial UserModelSubject instance:",
				error,
			);
			throw error;
		}
	}

	static getInstance(): Promise<UserModelSubject> {
		if (!this.instancePromise) {
			this.instancePromise = this.getInitialInstance();
		}

		return this.instancePromise.catch((error) => {
			this.instancePromise = null;
			throw error;
		});
	}
}

// Free helper function
// Subscribes to the BehaviourSubject managed by the UserModelSubject singleton.
// Returns an unsubscribe callback to give the calller the flexibility to act on the disassociation as required.
export async function subscribeToUserModelSubject(
	nextCb: (value: User) => void,
	errorCb?: (error: any) => void,
) {
	try {
		const userModelSubject = await UserModelSubject.getInstance();
		const subscription = userModelSubject.sub.subscribe({
			next: nextCb,
			error: (error) => console.error("Error fetching user data:", error),
		});

		// Return the cleanup function directly from the async function
		return () => subscription.unsubscribe();
	} catch (error) {
		if (errorCb) {
			errorCb(error);
		} else {
			console.error("Error initializing UserModelSubject:", error);
		}
	}
}
