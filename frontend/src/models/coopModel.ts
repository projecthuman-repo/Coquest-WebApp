import { Milestone, VolunteerPosition } from "./programModel";
import { CoopRole } from "./roleModel";
import { User } from "./usermodel";

export interface Coop {
	readonly _id: string | undefined;
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
	openRoles: CoopRole[] | null;
	members?: User[];
}
