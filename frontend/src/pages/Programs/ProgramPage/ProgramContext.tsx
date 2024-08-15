import React, { createContext, useState, useContext, useEffect } from "react";
import { Program } from "../../../models/programModel";
import { ProgramsContext } from "../ProgramsContext";

type ProgramContextType = {
	program: Program | null;
	setProgram: React.Dispatch<React.SetStateAction<Program | null>>;
};

type ProgramContextProviderProps = {
	children: React.ReactNode;
};

export const ProgramContext = createContext<ProgramContextType>({
	program: null,
	setProgram: () => {},
});

export const ProgramContextProvider = ({
	children,
}: ProgramContextProviderProps) => {
	const { programs } = useContext(ProgramsContext);
	const [program, setProgram] = useState<Program | null>(null);

	useEffect(() => {
		if (program === null) {
			const path = window.location.pathname;
			const segments = path.split("/");
			const index = segments.indexOf("programs");
			if (index !== -1 && segments[index + 1]) {
				const programId = parseInt(segments[index + 1], 10);
				if (!isNaN(programId)) {
					const program = programs.find(
						(program) => program.id === programId,
					);
					if (program) {
						setProgram(program);
					}
				}
			}
		}
	}, [programs, program]);

	return (
		<ProgramContext.Provider value={{ program, setProgram }}>
			{children}
		</ProgramContext.Provider>
	);
};
