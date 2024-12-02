import {
	Milestone,
	VolunteerPosition,
	BudgetItem,
	Location,
	Member,
} from "./programModel";
import { ProjectRole } from "./roleModel";

export interface Project {
	readonly _id: string | undefined;
	userID?: string | null;
	name?: string | null;
	summary?: string | null; // Description
	mission?: string | null; // Objective
	type?: string | null; // Initiative
	recurring?: string | null;
	startDate?: string | null;
	endDate?: string | null;
	startTime?: string | null;
	endTime?: string | null;
	location?: Location | null;
	milestones?: Milestone[] | null;
	volunteerPositions?: VolunteerPosition[] | null;
	openRoles?: ProjectRole[] | null;

	category?: string | null;
	isCharity?: boolean | undefined;
	isPublic?: boolean | undefined;

	hashtags?: string[] | null;

	// progress has to be computed from milestones
	progress?: number | null;

	spots?: number | null; // null means no limit
	cost?: number | null;

	experienceInPlanning?: boolean | undefined;
	haveNeutralMeetingSpace?: boolean | undefined;
	bookedRentalSpace?: boolean | undefined;
	additionalInfo?: string | null;

	budgetingItems?: BudgetItem[] | null;
	totalBudgetExpenses?: number | null;
	openToBartering?: boolean | undefined;
	needsCrowdfunding?: boolean | undefined;
	crowdfundingAmount?: number | null;
	crowdfundingDate?: string | null;
	crowdfundingMessage?: string | null;

	promotionArea?: Location | null;
	radius?: string | null;
	promotionImage?: string | null;
	shareLink?: string | null;
	members?: Member[] | null;
}
