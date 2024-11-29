import { ProgramRole } from "./roleModel";
import { Model } from "./common";

export interface ProgramRequired {
	readonly id: string | undefined;
	name: string;
	description: string;
	objective: string;
	initiative: string;
	location: string;
	cost: number | null;
}

export interface ProgramOptional {
	progress: number | null;
	time: string | null;
	date: string | null;
	spots: number | null;
	milestones: Milestone[] | null;
	volunteerPositions: VolunteerPosition[] | null;
	openRoles: ProgramRole[] | null;
}

// Updated Program class
export class Program implements Model {
	readonly id: string | undefined;
	name: string;
	description: string;
	objective: string;
	initiative: string;
	location: string;
	cost: number | null;

	// Optional properties
	progress: number | null;
	time: string | null;
	date: string | null;
	spots: number | null;
	milestones: Milestone[] | null;
	volunteerPositions: VolunteerPosition[] | null;
	openRoles: ProgramRole[] | null;

	constructor(
		params: ProgramRequired & Partial<ProgramOptional> = {
			id: undefined,
			name: "",
			description: "",
			objective: "",
			initiative: "",
			location: "",
			cost: null,
		},
	) {
		this.id = params.id;
		this.name = params.name;
		this.description = params.description;
		this.objective = params.objective;
		this.initiative = params.initiative;
		this.location = params.location;
		this.cost = params.cost;

		// Optional properties
		this.progress = params.progress ?? null;
		this.time = params.time ?? null;
		this.date = params.date ?? null;
		this.spots = params.spots ?? null;
		this.milestones = params.milestones ?? [];
		this.volunteerPositions = params.volunteerPositions ?? [];
		this.openRoles = params.openRoles ?? [];
	}

	// Validation method to check if the program has a valid id
	isValid(): boolean {
		return !!this.id;
	}

	// Method to provide default values for optional properties
	getDefaultForProperty(key: string): any {
		const defaultValues: { [key: string]: any } = {
			milestones: [],
			volunteerPositions: [],
			openRoles: [],
		};

		return Object.prototype.hasOwnProperty.call(defaultValues, key)
			? defaultValues[key]
			: null;
	}
}

// Milestone Interface
export interface Milestone {
	readonly id: string | undefined;
	type: string;
	title: string;
	progress: number;
	description: string;
	completedBy: string;
	dateStarted: string;
	dateCompleted: string;
}

// Volunteer Position Interface
export interface VolunteerPosition {
	readonly id: string | undefined;
	title: string;
	responsibilities: string;
	skills: string[];
}
