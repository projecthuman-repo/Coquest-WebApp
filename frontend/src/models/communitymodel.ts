import {
	ExpandableUser,
	Image,
	Location,
	Model,
	initExpandable,
} from "./common";
import { User, generateProfileImg } from "./usermodel";

export interface CommunityRequired {
	readonly _id: string | undefined;
	name: string;
	description: string;
	objective: string;
	initiative: string;
	location: Location | null;
}

export interface CommunityOptional {
	members: ExpandableUser[] | null;
	tags: string[] | null;
	images: Image[] | null;
}

// TODO: Convert to class to encapsulate property manipulations
export class Community implements Model {
	readonly id: string | undefined;
	name: string;
	description: string;
	objective: string;
	initiative: string;
	location: Location | null;
	// Expandable
	members: ExpandableUser[] | null | undefined;
	// Set of descriptors to help distinguish communities
	tags: string[] | null | undefined;
	// Coordinate on the world map situated in the relative area of a community
	images: Image[] | null | undefined;

	isValid(): boolean {
		return !!this.id;
	}
	getDefaultForProperty(key: string): any {
		const defaultValues: { [key: string]: any } = {
			members: [],
			tags: [],
			images: [generateProfileImg()],
		};

		return Object.prototype.hasOwnProperty.call(defaultValues, key)
			? defaultValues[key]
			: null;
	}

	constructor(
		params: CommunityRequired & Partial<CommunityOptional> = {
			_id: undefined,
			name: "",
			description: "",
			objective: "",
			initiative: "",
			location: { lng: 0, lat: 0 },
		},
	) {
		this.id = params._id;
		this.name = params.name;
		this.description = params.description;
		this.objective = params.objective;
		this.initiative = params.initiative;
		this.location = params.location;
		this.members = params.members
			? (initExpandable(
					params.members,
					"regenquestUser",
					User,
				) as ExpandableUser[])
			: params.members;
		this.tags = params.tags;
		this.images = params.images;
	}
}
