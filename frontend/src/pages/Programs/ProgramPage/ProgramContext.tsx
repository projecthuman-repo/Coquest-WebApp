import React, { createContext, useState } from "react";
import { Program } from "../../../models/programModel";

type ProgramContextType = {
	program: Program | null;
	setProgram: React.Dispatch<React.SetStateAction<Program | null>>;
};

type ProgramsContextProviderProps = {
	children: React.ReactNode;
};

export const ProgramContext = createContext<ProgramContextType>({
	program: null,
	setProgram: () => {},
});

export const ProgramsContextProvider = ({
	children,
}: ProgramsContextProviderProps) => {
	const [program, setProgram] = useState<Program | null>(null);

	return (
		<ProgramContext.Provider value={{ program, setProgram }}>
			{children}
		</ProgramContext.Provider>
	);
};
