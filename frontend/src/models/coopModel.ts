import { Milestone, VolunteerPosition } from "./programModel";
import { CoopRole } from "./roleModel";

export interface Coop {
	readonly _id: string | undefined;
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
	openRoles?: CoopRole[];
	members?: {
		userID?: string | null;
		username?: string | null;
	}[] | null;

	// progress has to be computed from milestones
	progress?: number | null;

	spots?: number | null;
	cost?: number | null;
}
