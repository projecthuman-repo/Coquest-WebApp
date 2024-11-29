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
	readonly _id: string | undefined;
	type: string;
	// type: "program" | "coop" | "project";
	title: string;
	completed: boolean;
	description: string;
	completedBy: string;
	dateStarted: string;
	dateCompleted: string;
}

export interface VolunteerPosition {
	readonly id: string | undefined;
	title: string;
	responsibilities: string;
	skills: string[];
}
