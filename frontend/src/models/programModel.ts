export interface Program {
	id: number;
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
}

export interface Milestone {
	id: number;
	type: string;
	title: string;
	progress: number;
	description: string;
	completedBy: string;
	dateStarted: string;
	dateCompleted: string;
}

export interface VolunteerPosition {
	id: number;
	title: string;
	responsibilities: string;
	skills: string[];
}
