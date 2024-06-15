import {
	Image,
	Location,
	Skill,
	Badge,
	Recommendations,
	ExpandableCommunity,
	Registered,
	RegisteredRepType,
	Model,
	initExpandable,
} from "./common";
import { Community } from "./communitymodel";

interface UserRequiredBase {
	readonly _id: string | undefined;
	username: string;
	email: string;
}

export type Name = {
	first: string;
	middle?: string;
	last: string;
};

type NameFields = {
	firstName: string;
	middleName?: string;
	lastName: string;
};

export type UserRequired = UserRequiredBase & (NameFields | { name: Name });

export interface UserOptional {
	registered: Registered | number | boolean;
	location: Location | null;
	images: Image[] | null;
	motives: string[] | null;
	biography: string | null;
	topics: string[] | null;
	communities: ExpandableCommunity[] | null;
	skills: Skill[] | null;
	badges: Badge[] | null;
	currentLevel: number;
	recommendations: Recommendations[] | null;
}

export class User implements Model {
	// Note: ID field can be undefined when the instance represents a brand new user
	readonly id: string | undefined;
	name: Name;
	username: string;
	email: string;
	/*
	The progress of registration; it is either a boolean or a Number[1, NUM_OF_STEPS].

	Interpretations:
	- Boolean: Signifies whether the user has yet to start or has completed the registration process
	- Number[1, NUM_OF_STEPS]: Indicates the step on which the user is actively working
	*/
	registered: Registered;
	/*
	Location uses null to represent safe empty state to prevent prepopulating map data
	when geolocating for the first time
	*/
	location: Location | null | undefined;
	images: Image[] | null | undefined;
	motives: string[] | null | undefined;
	biography: string | null | undefined;
	topics: string[] | null | undefined;
	// Expandable set of affliated communities
	communities: ExpandableCommunity[] | null | undefined;
	// The following properties are a part of the reputation system
	skills: Skill[] | null | undefined;
	badges: Badge[] | null | undefined;
	currentLevel: number;
	recommendations: Recommendations[] | null | undefined;

	setNumRegistered(newStep: number) {
		this.registered = {
			type: RegisteredRepType.NUMBER,
			numValue: newStep,
		};
	}

	setBoolRegistered(newStatus: boolean) {
		this.registered = {
			type: RegisteredRepType.BOOLEAN,
			boolValue: newStatus,
		};
	}

	isValid() {
		return (this.currentLevel ?? -1) >= 0;
	}

	getDefaultForProperty(key: string): any {
		const defaultValues: { [key: string]: any } = {
			images: [generateProfileImg()],
			motives: [],
			biography: "",
			topics: [],
			communities: [],
			skills: [],
			badges: [],
			recommendations: [],
		};

		return Object.prototype.hasOwnProperty.call(defaultValues, key)
			? defaultValues[key]
			: null;
	}

	constructor(
		params: UserRequired & Partial<UserOptional> = {
			_id: undefined,
			firstName: "",
			lastName: "",
			email: "",
			username: "",
		},
	) {
		this.id = params._id;

		if ("name" in params) {
			this.name = params.name;
		} else {
			this.name = {
				first: params.firstName,
				middle: params.middleName,
				last: params.lastName,
			};
		}

		this.username = params.username;
		this.email = params.email;

		this.registered = { type: RegisteredRepType.BOOLEAN, boolValue: false };
		if (params.registered) {
			if (typeof params.registered === "boolean") {
				this.setBoolRegistered(params.registered);
			} else if (typeof params.registered === "number") {
				this.setNumRegistered(params.registered);
			} else if ("type" in params.registered) {
				this.registered = params.registered;
			}
		}

		this.location = params.location;
		this.images = params.images;
		this.motives = params.motives;
		this.biography = params.biography;
		this.topics = params.topics;
		this.communities = params.communities
			? (initExpandable(
					params.communities,
					"regenquestCommunity",
					Community,
				) as ExpandableCommunity[])
			: params.communities;
		this.skills = params.skills;
		this.badges = params.badges;
		// Use currentLevel property to indicate the state status. (That is, whether the instance is in safe empty state.)
		if (this.id && this.name.first && this.email && this.username) {
			this.currentLevel = params.currentLevel ?? 0;
		} else {
			this.currentLevel = -1;
		}
		this.recommendations = params.recommendations;
	}
}

export function generateProfileImg(): Image {
	const randString = Math.random().toString(36).substring(2);

	return {
		contentType: "image/svg+xml",
		path: `https://api.dicebear.com/7.x/thumbs/svg?size=400&radius=50&backgroundColor=transparent&seed=${randString}`,
	};
}
