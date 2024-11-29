import React, { createContext, useContext } from "react";
import { Program } from "../../../models/programModel";
import { ProgramsContext } from "../ProgramsContext";
import graphQLClient from "@/apiInterface/client";
import { UPDATE_PROGRAM_MUTATION } from "@/apiInterface/gqlOperations";

type ProgramContextType = {
	program: Program | null;
	updateProgram: (program: Program) => void;
};

type ProgramContextProviderProps = {
	children: React.ReactNode;
};

export const ProgramContext = createContext<ProgramContextType>({
	program: null,
	updateProgram: () => {},
});

export const ProgramContextProvider = ({
	children,
}: ProgramContextProviderProps) => {
	const { programs, setPrograms } = useContext(ProgramsContext);
	let program: Program | null = null;

	const updateProgram = (program: Program) => {
		console.log("Updating program", program);
		// Exclude unwanted fields from the `program` object
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { milestones, progress, members, ...programInput } = program;
		const filteredMilestones = milestones?.filter(
			(milestone) => milestone.title,
		);
		const cleanedMilestones = filteredMilestones?.map((milestone) => {
			// Remove fields that don't exist in the schema
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { type, completedBy, ...rest } = milestone;
			return rest;
		});
		graphQLClient
			.request(UPDATE_PROGRAM_MUTATION, {
				// @ts-expect-error TS thinks title may be undefined; it's filtered above
				userInput: { ...programInput, milestones: cleanedMilestones },
			})
			.then(console.log)
			.catch(console.error);

		setPrograms(programs.map((p) => (p._id === program._id ? program : p)));
	};

	if (program === null) {
		const path = window.location.pathname;
		const segments = path.split("/");
		const index = segments.indexOf("programs");
		if (index !== -1 && segments[index + 1]) {
			const programId = segments[index + 1]; // Directly use the segment as a string ID
			program =
				programs.find(
					(p) => p._id === programId, // Compare as strings
				) ?? null;
		}
	}

	return (
		<ProgramContext.Provider value={{ program, updateProgram }}>
			{children}
		</ProgramContext.Provider>
	);
};
