import { Milestone, VolunteerPosition } from "./programModel";
import { ProjectRole } from "./roleModel";

export interface Project {
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
	openRoles?: ProjectRole[] | null;
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
