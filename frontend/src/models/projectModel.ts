import { Milestone, VolunteerPosition } from "./programModel";
import { ProjectRole } from "./roleModel";

export interface Project {
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
	openRoles: ProjectRole[] | null;
}