import { BehaviorSubject, firstValueFrom } from "rxjs";
import { User, UserOptional, UserRequired } from "../models/usermodel";
import Repository from "../repositories/repository";
import { getUserFromJWT } from "../models/jwt";

export class UserModelSubject {
	private static instancePromise: Promise<UserModelSubject>;
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

	private static async getInitialInstance(): Promise<UserModelSubject> {
		const value = await firstValueFrom(
			Repository.getInstance("User", User).fetch(
				await getUserFromJWT(),
				{ currentLevel: 0 },
				{
					expand: JSON.stringify({
						regenquestUser: [{ communities: ["members"] }],
					}),
				},
			),
		);
		return new UserModelSubject({ _id: value.id, ...value });
	}

	static async getInstance(): Promise<UserModelSubject> {
		if (!this.instancePromise) {
			this.instancePromise = this.getInitialInstance();
		}
		return this.instancePromise;
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
