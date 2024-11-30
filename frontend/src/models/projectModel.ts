import {
	Milestone,
	VolunteerPosition,
	Category,
	Hashtag,
	Admin,
	BudgetItem,
} from "./programModel";
import { ProjectRole } from "./roleModel";
import { User } from "./usermodel";

export interface Project {
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
	openRoles: ProjectRole[] | null;

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
