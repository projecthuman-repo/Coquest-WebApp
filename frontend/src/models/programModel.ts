import { ProgramRole } from "./roleModel";

export interface Program {
	readonly id: string | undefined;
	name: string;
	progress: number | null;
	description: string;
	objective: string;
	initiative: string;
	time: string | null;
	date: string | null;
	location: string;
	spots: number | null;
	cost: number | null;
	milestones: Milestone[];
	volunteerPositions: VolunteerPosition[];
	openRoles: ProgramRole[] | null;
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
