import React, { createContext, useState } from "react";
import { Program } from "../../models/programModel";

// import { subscribeToUserModelSubject } from "../../observers/userobserver";
// import { User } from "../../models/usermodel";
// import Loading from "../../components/Loading";

// TODO fetch post data from backend
const data = [
	{
		id: 1,
		name: "Program 1",
		progress: 50,
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
		objective:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
		initiative:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
		time: "every Mon and Wed, 6:00 - 6:30pm",
		date: "Jan 1 - 31, 2023",
		location: "Community center",
		spots: 3,
		cost: 15,
		milestones: [
			{
				id: 1,
				type: "Milestone",
				title: "Milestone 1",
				progress: 100,
				description:
					"Lorem ipsum dolor sit amet consectetur. Id maecenas tortor porta ultrices faucibus. Sed potenti ac egestas in. Vitae pellentesque arcu ornare eu elit habitant in odio. Quis urna montes risus luctus. Tortor arcu sit condimentum commodo sit sed suscipit vel. Viverra diam nisl tristique mauris diam. Facilisi quam id tincidunt faucibus non gravida nisl vivamus faucibus. Dignissim vitae gravida amet id cursus at. Erat tincidunt amet id lacus nunc suspendisse ac sit auctor. Ut integer eget ut massa mattis quam donec consequat at.",
				completedBy: "John Doe",
				dateStarted: "2023-06-01",
				dateCompleted: "2023-08-22",
			},
			{
				id: 2,
				type: "Milestone",
				title: "Milestone 2",
				progress: 100,
				description:
					"Lorem ipsum dolor sit amet consectetur. Vitae cum eget dolor vehicula massa porttitor tortor eget. Vitae egestas lorem viverra sit. Arcu placerat suspendisse ac eget sed. Ut etiam ut sit cursus sem.",
				completedBy: "John Doe",
				dateStarted: "2021-08-01",
				dateCompleted: "2021-08-15",
			},
			{
				id: 3,
				type: "Milestone",
				title: "Milestone 3",
				progress: 20,
				description:
					"Lorem ipsum dolor sit amet consectetur. Vitae cum eget dolor vehicula massa porttitor tortor eget. Vitae egestas lorem viverra sit. Arcu placerat suspendisse ac eget sed. Ut etiam ut sit cursus sem.",
				completedBy: "John Doe",
				dateStarted: "2024-08-01",
				dateCompleted: "2024-08-15",
			},
			{
				id: 4,
				type: "Milestone",
				title: "Milestone 4",
				progress: 0,
				description:
					"Lorem ipsum dolor sit amet consectetur. Vitae cum eget dolor vehicula massa porttitor tortor eget. Vitae egestas lorem viverra sit. Arcu placerat suspendisse ac eget sed. Ut etiam ut sit cursus sem.",
				completedBy: "John Doe",
				dateStarted: "2024-08-01",
				dateCompleted: "2024-08-15",
			},
		],
		volunteerPositions: [
			{
				id: 1,
				title: "Program Title",
				responsibilities:
					"Lorem ipsum dolor sit amet consectetur. Id maecenas tortor porta ultrices faucibus. Sed potenti ac egestas in. Vitae pellentesque arcu ornare eu elit habitant in odio. Quis urna montes risus luctus. Tortor arcu sit condimentum commodo sit sed suscipit vel. Viverra diam nisl tristique mauris diam. Facilisi quam id tincidunt faucibus non gravida nisl vivamus faucibus. Dignissim vitae gravida amet id cursus at. Erat tincidunt amet id lacus nunc suspendisse ac sit auctor. Ut integer eget ut massa mattis quam donec consequat at.",
				skills: ["Skill 1", "Skill 2", "Skill 3"],
			},
			{
				id: 2,
				title: "Program Title",
				responsibilities:
					"Lorem ipsum dolor sit amet consectetur. Id maecenas tortor porta ultrices faucibus. Sed potenti ac egestas in. Vitae pellentesque arcu ornare eu elit habitant in odio. Quis urna montes risus luctus. Tortor arcu sit condimentum commodo sit sed suscipit vel. Viverra diam nisl tristique mauris diam. Facilisi quam id tincidunt faucibus non gravida nisl vivamus faucibus. Dignissim vitae gravida amet id cursus at. Erat tincidunt amet id lacus nunc suspendisse ac sit auctor. Ut integer eget ut massa mattis quam donec consequat at.",
				skills: ["Skill 1", "Skill 2", "Skill 3"],
			},
			{
				id: 3,
				title: "Program Title",
				responsibilities:
					"Lorem ipsum dolor sit amet consectetur. Id maecenas tortor porta ultrices faucibus. Sed potenti ac egestas in. Vitae pellentesque arcu ornare eu elit habitant in odio. Quis urna montes risus luctus. Tortor arcu sit condimentum commodo sit sed suscipit vel. Viverra diam nisl tristique mauris diam. Facilisi quam id tincidunt faucibus non gravida nisl vivamus faucibus. Dignissim vitae gravida amet id cursus at. Erat tincidunt amet id lacus nunc suspendisse ac sit auctor. Ut integer eget ut massa mattis quam donec consequat at.",
				skills: ["Skill 1", "Skill 2", "Skill 3"],
			},
			{
				id: 4,
				title: "Program Title",
				responsibilities:
					"Lorem ipsum dolor sit amet consectetur. Id maecenas tortor porta ultrices faucibus. Sed potenti ac egestas in. Vitae pellentesque arcu ornare eu elit habitant in odio. Quis urna montes risus luctus. Tortor arcu sit condimentum commodo sit sed suscipit vel. Viverra diam nisl tristique mauris diam. Facilisi quam id tincidunt faucibus non gravida nisl vivamus faucibus. Dignissim vitae gravida amet id cursus at. Erat tincidunt amet id lacus nunc suspendisse ac sit auctor. Ut integer eget ut massa mattis quam donec consequat at.",
				skills: ["Skill 1", "Skill 2", "Skill 3"],
			},
		],
	},
	{
		id: 2,
		name: "Program 2",
		progress: 15,
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
		objective:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
		initiative:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
		time: "every Mon and Wed, 6:00 - 6:30pm",
		date: "Jan 1 - 31, 2023",
		location: "Community center",
		spots: 11,
		cost: 20,
		milestones: [
			{
				id: 1,
				type: "Milestone",
				title: "Milestone 1",
				progress: 17,
				description:
					"Lorem ipsum dolor sit amet consectetur. Id maecenas tortor porta ultrices faucibus. Sed potenti ac egestas in. Vitae pellentesque arcu ornare eu elit habitant in odio. Quis urna montes risus luctus. Tortor arcu sit condimentum commodo sit sed suscipit vel. Viverra diam nisl tristique mauris diam. Facilisi quam id tincidunt faucibus non gravida nisl vivamus faucibus. Dignissim vitae gravida amet id cursus at. Erat tincidunt amet id lacus nunc suspendisse ac sit auctor. Ut integer eget ut massa mattis quam donec consequat at.",
				completedBy: "John Doe",
				dateStarted: "2023-06-01",
				dateCompleted: "2023-08-22",
			},
			{
				id: 2,
				type: "Milestone",
				title: "Milestone 2",
				progress: 7,
				description:
					"Lorem ipsum dolor sit amet consectetur. Vitae cum eget dolor vehicula massa porttitor tortor eget. Vitae egestas lorem viverra sit. Arcu placerat suspendisse ac eget sed. Ut etiam ut sit cursus sem.",
				completedBy: "John Doe",
				dateStarted: "2021-08-01",
				dateCompleted: "2021-08-15",
			},
		],
		volunteerPositions: [
			{
				id: 1,
				title: "Program Title",
				responsibilities:
					"Lorem ipsum dolor sit amet consectetur. Id maecenas tortor porta ultrices faucibus. Sed potenti ac egestas in. Vitae pellentesque arcu ornare eu elit habitant in odio. Quis urna montes risus luctus. Tortor arcu sit condimentum commodo sit sed suscipit vel. Viverra diam nisl tristique mauris diam. Facilisi quam id tincidunt faucibus non gravida nisl vivamus faucibus. Dignissim vitae gravida amet id cursus at. Erat tincidunt amet id lacus nunc suspendisse ac sit auctor. Ut integer eget ut massa mattis quam donec consequat at.",
				skills: ["Skill 1", "Skill 2", "Skill 3"],
			},
			{
				id: 2,
				title: "Program Title",
				responsibilities:
					"Lorem ipsum dolor sit amet consectetur. Id maecenas tortor porta ultrices faucibus. Sed potenti ac egestas in. Vitae pellentesque arcu ornare eu elit habitant in odio. Quis urna montes risus luctus. Tortor arcu sit condimentum commodo sit sed suscipit vel. Viverra diam nisl tristique mauris diam. Facilisi quam id tincidunt faucibus non gravida nisl vivamus faucibus. Dignissim vitae gravida amet id cursus at. Erat tincidunt amet id lacus nunc suspendisse ac sit auctor. Ut integer eget ut massa mattis quam donec consequat at.",
				skills: ["Skill 1", "Skill 2", "Skill 3"],
			},
			{
				id: 3,
				title: "Program Title",
				responsibilities:
					"Lorem ipsum dolor sit amet consectetur. Id maecenas tortor porta ultrices faucibus. Sed potenti ac egestas in. Vitae pellentesque arcu ornare eu elit habitant in odio. Quis urna montes risus luctus. Tortor arcu sit condimentum commodo sit sed suscipit vel. Viverra diam nisl tristique mauris diam. Facilisi quam id tincidunt faucibus non gravida nisl vivamus faucibus. Dignissim vitae gravida amet id cursus at. Erat tincidunt amet id lacus nunc suspendisse ac sit auctor. Ut integer eget ut massa mattis quam donec consequat at.",
				skills: ["Skill 1", "Skill 2", "Skill 3"],
			},
		],
	},
	{
		id: 3,
		name: "Program 3",
		progress: 88,
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
		objective:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
		initiative:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
		time: "every Mon and Wed, 6:00 - 6:30pm",
		date: "Jan 1 - 31, 2023",
		location: "Community center",
		spots: 5,
		cost: 75,
		milestones: [
			{
				id: 1,
				type: "Milestone",
				title: "Milestone 1",
				progress: 100,
				description:
					"Lorem ipsum dolor sit amet consectetur. Id maecenas tortor porta ultrices faucibus. Sed potenti ac egestas in. Vitae pellentesque arcu ornare eu elit habitant in odio. Quis urna montes risus luctus. Tortor arcu sit condimentum commodo sit sed suscipit vel. Viverra diam nisl tristique mauris diam. Facilisi quam id tincidunt faucibus non gravida nisl vivamus faucibus. Dignissim vitae gravida amet id cursus at. Erat tincidunt amet id lacus nunc suspendisse ac sit auctor. Ut integer eget ut massa mattis quam donec consequat at.",
				completedBy: "John Doe",
				dateStarted: "2023-06-01",
				dateCompleted: "2023-08-22",
			},
			{
				id: 2,
				type: "Milestone",
				title: "Milestone 2",
				progress: 100,
				description:
					"Lorem ipsum dolor sit amet consectetur. Vitae cum eget dolor vehicula massa porttitor tortor eget. Vitae egestas lorem viverra sit. Arcu placerat suspendisse ac eget sed. Ut etiam ut sit cursus sem.",
				completedBy: "John Doe",
				dateStarted: "2021-08-01",
				dateCompleted: "2021-08-15",
			},
			{
				id: 3,
				type: "Milestone",
				title: "Milestone 3",
				progress: 20,
				description:
					"Lorem ipsum dolor sit amet consectetur. Vitae cum eget dolor vehicula massa porttitor tortor eget. Vitae egestas lorem viverra sit. Arcu placerat suspendisse ac eget sed. Ut etiam ut sit cursus sem.",
				completedBy: "John Doe",
				dateStarted: "2024-08-01",
				dateCompleted: "2024-08-15",
			},
		],
		volunteerPositions: [
			{
				id: 1,
				title: "Program Title",
				responsibilities:
					"Lorem ipsum dolor sit amet consectetur. Id maecenas tortor porta ultrices faucibus. Sed potenti ac egestas in. Vitae pellentesque arcu ornare eu elit habitant in odio. Quis urna montes risus luctus. Tortor arcu sit condimentum commodo sit sed suscipit vel. Viverra diam nisl tristique mauris diam. Facilisi quam id tincidunt faucibus non gravida nisl vivamus faucibus. Dignissim vitae gravida amet id cursus at. Erat tincidunt amet id lacus nunc suspendisse ac sit auctor. Ut integer eget ut massa mattis quam donec consequat at.",
				skills: ["Skill 1", "Skill 2", "Skill 3"],
			},
		],
	},
];

type ProgramsContextType = {
	programs: Program[];
	setPrograms: React.Dispatch<React.SetStateAction<Program[]>>;
};

type ProgramsContextProviderProps = {
	children: React.ReactNode;
};

export const ProgramsContext = createContext<ProgramsContextType>({
	programs: [],
	setPrograms: () => {},
});

export const ProgramsContextProvider = ({
	children,
}: ProgramsContextProviderProps) => {
	const [programs, setPrograms] = useState<Program[]>(data);

	return (
		<ProgramsContext.Provider value={{ programs, setPrograms }}>
			{children}
		</ProgramsContext.Provider>
	);
};
