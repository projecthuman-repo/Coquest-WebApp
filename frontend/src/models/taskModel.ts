// taskModel.ts
import { Location, Image, ExpandableUser } from "./common";

export enum TaskStatus {
	PENDING = "pending",
	IN_PROGRESS = "in_progress",
	COMPLETED = "completed",
}

export interface TaskProperties {
	readonly id: string | undefined;
	taskName: string;
	communityName: string;
	location: Location;
	description: string;
	images?: Image[];
	status: TaskStatus;
	assignedTo?: ExpandableUser;
	createdAt?: Date;
	updatedAt?: Date;
	userID: string;
	questID: string;
	requirements: string[];
	completionStatus: boolean;
	history: string[];
}

export class TaskImpl implements TaskProperties {
	readonly id: string | undefined;
	taskName: string;
	communityName: string;
	location: Location;
	description: string;
	images: Image[];
	status: TaskStatus;
	assignedTo?: ExpandableUser;
	createdAt?: Date;
	updatedAt?: Date;
	userID: string;
	questID: string;
	requirements: string[];
	completionStatus: boolean;
	history: string[];

	constructor(params: TaskProperties) {
		this.id = params.id;
		this.taskName = params.taskName;
		this.communityName = params.communityName;
		this.location = params.location;
		this.description = params.description;
		this.images = params.images || [];
		this.status = params.status;
		this.assignedTo = params.assignedTo;
		this.createdAt = params.createdAt;
		this.updatedAt = params.updatedAt;
		this.userID = params.userID;
		this.questID = params.questID;
		this.requirements = params.requirements || [];
		this.completionStatus = params.completionStatus || false;
		this.history = params.history || [];
	}

	isValid(): boolean {
		return !!this.taskName && !!this.communityName && !!this.description;
	}
}
