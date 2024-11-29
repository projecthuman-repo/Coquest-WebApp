import { ProgramRole } from "./roleModel";

export interface Program {
	readonly _id: string | undefined;
	userID?: string | null;
	name?: string | null;
	summary?: string | null;
	mission?: string | null;
	type?: string | null;
	recurring?: string | null;
	startDate?: string | null;
	endDate?: string | null;
	location?: {
		name?: string | null;
		lat?: number | null;
		lng?: number | null;
	} | null;
	milestones?: Milestone[] | null;
	volunteerPositions?: VolunteerPosition[] | null;
	openRoles?: ProgramRole[] | null;
	members?:
		| {
				_id?: string | null;
				username?: string | null;
		  }[]
		| null;

	// progress has to be computed from milestones
	progress?: number | null;

	spots?: number | null;
	cost?: number | null;
}

export interface Milestone {
	readonly _id?: string;
	type?: string;
	// type: "program" | "coop" | "project";
	title?: string | null;
	completed?: boolean | null;
	description?: string | null;
	completedBy?: string | null;
	dateStarted?: string | null;
	dateCompleted?: string | null;
}

export interface VolunteerPosition {
	readonly id?: string;
	title?: string | null;
	responsibilities?: string | null;
	skills?: string[] | null;
}
