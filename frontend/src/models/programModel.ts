import { ProgramRole } from "./roleModel";
import { User } from "./usermodel";

export interface Program {
	readonly id: string | undefined;
	name: string;
	category: Category | null;
	progress: number | null;

	description: string;
	objective: string;

	isCharity: boolean | undefined;
	initiative: string;
	isPublic: boolean | undefined;

	hashtags: Hashtag[];
	admin: Admin;

	startTime: string | null;
	endTime: string | null;
	startDate: Date | null;
	endDate: Date | null;
	recurring: string;

	location: string;
	spots: number | null; // null means no limit

	budgetExpenses: BudgetItem[];
	totalBudgetExpenses: number;
	cost: number | null;
	isOpenToBarter: boolean | undefined;
	crowdfunding: {
		needed: boolean | undefined;
		amount: number | null;
		dateOfFunding: Date | null;
		thankyouMessage: string;
	};

	milestones: Milestone[];
	volunteerPositions: VolunteerPosition[];
	openRoles: ProgramRole[] | null;

	promotionArea: {
		locationName: string;
		latitude: number;
		longitude: number;
		radius: number;
	} | null;
	headerImage: string;
	sharelink: string;
	invitedPeople: User[];
}

export interface Milestone {
	readonly id: string | undefined;
	type: string;
	title: string;
	progress: number;
	description: string;
	completedBy: string;
	dateStarted: string;
	dateCompleted: string;
}

export interface VolunteerPosition {
	readonly id: string | undefined;
	title: string;
	responsibilities: string;
	skills: Skill[];
}

export interface Category {
	readonly id: string | undefined;
	name: string;
}
export interface Hashtag {
	readonly id: string | undefined;
	name: string;
}

export interface Admin {
	readonly id: string | undefined;
	experienceInPlanning: boolean | undefined;
	ownSpace: boolean | undefined;
	bookedRentalSpace: boolean | undefined;
	additionalInfo: string;
}

export interface Skill {
	readonly id: string | undefined;
	name: string;
}

export interface BudgetItem {
	readonly id: string | undefined;
	name: string;
	quantity: number | undefined;
	costEach: number | undefined;
	costTotal: number | undefined;
}
