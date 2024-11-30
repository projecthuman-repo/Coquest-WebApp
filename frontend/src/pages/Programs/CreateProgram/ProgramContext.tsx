import React, {
	createContext,
	useContext,
	useState,
	PropsWithChildren,
} from "react";
import { Program } from "../../../models/programModel";

// interface to indicate if the step can be proceeded
// and if unfilled fields should be highlighted (feedback for user as they tried to proceed)
interface StepStatus {
	canProceed: boolean;
	highlightUnfilled: boolean;
}

interface ProgramContextType {
	program: Program;
	updateProgram: (updates: Partial<Program>) => void;
	stepsCompleted: Record<string, StepStatus>;
	updateStepsCompleted: (
		step: string,
		canProceed: boolean,
		highlightUnfilled: boolean,
	) => void;
}

const ProgramContext = createContext<ProgramContextType | undefined>(undefined);

export const ProgramProvider: React.FC<PropsWithChildren> = ({ children }) => {
	// initial state of new program
	const [program, setProgram] = useState<Program>({
		id: undefined,
		name: "",
		progress: 0,
		category: null,
		description: "",
		objective: "",
		isCharity: undefined,
		initiative: "",
		hashtags: [],
		isPublic: undefined,
		admin: {
			id: undefined,
			experienceInPlanning: undefined,
			ownSpace: undefined,
			bookedRentalSpace: undefined,
			additionalInfo: "",
		},
		startTime: null,
		endTime: null,
		startDate: null,
		endDate: null,
		recurring: "",
		location: "",
		budgetExpenses: [],
		totalBudgetExpenses: 0,
		spots: null,
		cost: null,
		isOpenToBarter: undefined,
		crowdfunding: {
			needed: undefined,
			amount: null,
			dateOfFunding: null,
			thankyouMessage: "",
		},
		milestones: [],
		volunteerPositions: [],
		openRoles: null,
		promotionArea: null,
		headerImage: "",
		sharelink: "",
		invitedPeople: [],
	});

	const updateProgram = (updates: Partial<Program>) => {
		setProgram((prevProgram) => ({ ...prevProgram, ...updates }));
	};

	// state to keep track of which steps in program creation have been completed
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

	const contextValue: ProgramContextType = {
		program,
		updateProgram,
		stepsCompleted,
		updateStepsCompleted,
	};

	return (
		<ProgramContext.Provider value={contextValue}>
			{children}
		</ProgramContext.Provider>
	);
};

// hook to access the program context
export const useProgram = () => {
	const context = useContext(ProgramContext);
	if (context === undefined) {
		throw new Error("useProgram must be used within a ProgramProvider");
	}
	return context;
};
