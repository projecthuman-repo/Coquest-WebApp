export interface BaseRole {
	id: number;
	title: string;
	location: string;
	description: string;
	qualifications: string;
	datePosted: string;
	applicants: RoleApplicant[] | null;
	salary: number | null;
}

export interface ProgramRole extends BaseRole {
	program: string;
}

export interface ProjectRole extends BaseRole {
	project: string;
}

export interface RoleApplicant {
	id: number;
	dateApplied: string;
	name: string;
	companyName: string | null;
	address: string;
	phone: string;
	email: string;
	education: Education[] | null;
	experience: Experience[] | null;
	certifications: Certification[] | null;
	availability: DayAvailability[];
	previousProjects: PreviousProject[] | null;
	badges: Badge[] | null;
	references: Reference[] | null;
}

export interface Education {
	title: string;
	description: string;
	startDate: string;
	endDate: string | null;
	completionStatus: boolean;
}

export interface Experience {
	title: string;
	description: string;
	startDate: string;
	endDate: string | null;
}

export interface Certification {
	title: string;
	description: string;
	issueDate: string;
}

export interface DayAvailability {
	day: string;
	from: string;
	to: string;
}

export interface PreviousProject {
	title: string;
	description: string;
	startDate: string;
	endDate: string | null;
}

export interface Badge {
	title: string;
	description: string;
}

export interface Reference {
	name: string;
	companyName: string;
	phone: string;
	email: string;
}
