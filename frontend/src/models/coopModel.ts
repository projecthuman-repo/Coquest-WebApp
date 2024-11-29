import { Milestone, VolunteerPosition } from "./programModel";
import { CoopRole } from "./roleModel";
import { User } from "./usermodel";

export interface Coop {
	readonly _id: string | undefined;
	name: string;
	progress: number | null;
	summary: string;
	mission: string;
	type: string;
	recurring: string | null;
	startDate: string | null;
	endDate: string | null;
	location: {
		name: string;
		lat?: number;
		lng?: number;
	};
	spots: number | null;
	cost: number | null;
	milestones: Milestone[];
	volunteerPositions: VolunteerPosition[];
	openRoles: CoopRole[] | null;
	members?: User[];
}
