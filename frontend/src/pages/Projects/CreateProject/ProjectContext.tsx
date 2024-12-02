import React, {
	createContext,
	useContext,
	useState,
	PropsWithChildren,
} from "react";
import { Project } from "../../../models/projectModel";

// interface to indicate if the step can be proceeded
// and if unfilled fields should be highlighted (feedback for user as they tried to proceed)
interface StepStatus {
	canProceed: boolean;
	highlightUnfilled: boolean;
}

interface ProjectContextType {
	project: Project;
	updateProject: (updates: Partial<Project>) => void;
	stepsCompleted: Record<string, StepStatus>;
	updateStepsCompleted: (
		step: string,
		canProceed: boolean,
		highlightUnfilled: boolean,
	) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<PropsWithChildren> = ({ children }) => {
	// initial state of new project
	const [project, setProject] = useState<Project>({
		_id: undefined,
		userID: null,
		name: null,
		summary: null,
		mission: null,
		type: null,
		startTime: null,
		endTime: null,
		startDate: null,
		endDate: null,
		recurring: null,
		location: null,
		milestones: null,
		volunteerPositions: null,
		openRoles: null,
		category: null,
		isCharity: undefined,
		isPublic: undefined,
		hashtags: null,
		progress: 0, // default 0
		spots: null,
		cost: null,
		experienceInPlanning: undefined,
		haveNeutralMeetingSpace: undefined,
		bookedRentalSpace: undefined,
		additionalInfo: null,
		budgetingItems: null,
		totalBudgetExpenses: 0, // default 0
		openToBartering: undefined,
		needsCrowdfunding: undefined,
		crowdfundingAmount: null,
		crowdfundingDate: null,
		crowdfundingMessage: null,
		promotionArea: null,
		radius: null,
		promotionImage: null,
		shareLink: null,
		members: null,
	});

	const updateProject = (updates: Partial<Project>) => {
		setProject((prevProject) => ({ ...prevProject, ...updates }));
	};

	// state to keep track of which steps in project creation have been completed
	// and if specific step should highlight unfilled fields
	const [stepsCompleted, setStepsCompleted] = useState<
		Record<string, StepStatus>
	>({
		"basic-information": {
			canProceed: false,
			highlightUnfilled: false,
		},
		operations: {
			canProceed: false,
			highlightUnfilled: false,
		},
		budgeting: {
			canProceed: false,
			highlightUnfilled: false,
		},
		promotion: {
			canProceed: false,
			highlightUnfilled: false,
		},
		finish: {
			canProceed: false,
			highlightUnfilled: false,
		},
	});

	const updateStepsCompleted = (
		step: string,
		canProceed: boolean,
		highlightUnfilled: boolean,
	) => {
		setStepsCompleted((prevSteps) => ({
			...prevSteps,
			[step]: { canProceed, highlightUnfilled },
		}));
	};

	const contextValue: ProjectContextType = {
		project,
		updateProject,
		stepsCompleted,
		updateStepsCompleted,
	};

	return (
		<ProjectContext.Provider value={contextValue}>
			{children}
		</ProjectContext.Provider>
	);
};

// hook to access the project context
export const useProject = () => {
	const context = useContext(ProjectContext);
	if (context === undefined) {
		throw new Error("useProject must be used within a ProjectProvider");
	}
	return context;
};
