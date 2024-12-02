import { ProgramRole } from "./roleModel";

export interface Program {
	readonly _id: string | undefined;
	userID?: string | null;
	name?: string | null;
	summary?: string | null; // Description
	mission?: string | null; // Objective
	type?: string | null; // Initiative
	recurring?: string | null;
	startDate?: string | null; // prev date
	endDate?: string | null; // prev date
	startTime?: string | null;
	endTime?: string | null;
	location?: Location | null;
	milestones?: Milestone[] | null;
	volunteerPositions?: VolunteerPosition[] | null;
	openRoles?: ProgramRole[] | null;

	category?: string | null;
	isCharity?: boolean | undefined;
	isPublic?: boolean | undefined;

	hashtags?: string[] | null;

	// progress has to be computed from milestones
	progress?: number | null;

	spots?: number | null; // null means no limit
	cost?: number | null;

	experienceInPlanning?: boolean | undefined;
	haveNeutralMeetingSpace?: boolean | undefined; // previously ownSpace
	bookedRentalSpace?: boolean | undefined;
	additionalInfo?: string | null;

	budgetingItems?: BudgetItem[] | null; // previously budgetExpenses
	totalBudgetExpenses?: number | null;
	openToBartering?: boolean | undefined; // previously isOpenToBarter
	needsCrowdfunding?: boolean | undefined; // prev needed
	crowdfundingAmount?: number | null; // prev amount
	crowdfundingDate?: string | null; // prev date
	crowdfundingMessage?: string | null; // prev thankYouMessage

	promotionArea?: Location | null;
	radius?: string | null;
	promotionImage?: string | null;
	shareLink?: string | null; // prev sharelink
	members?: Member[] | null; // previously invitedPeople: User[]
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

// interfaces below are for clarity and consistency (no _id because they will be stored in the program object)

export interface Member {
	_id?: string | undefined;
	username?: string | null;
}

export interface BudgetItem {
	name?: string | null;
	quantity?: number | undefined;
	costEach?: number | undefined;
	costTotal?: number | undefined;
}

export interface Location {
	name?: string | null;
	lat?: number | null;
	lng?: number | null;
}
