import React, { createContext, useContext } from "react";
import { Coop } from "../../../models/coopModel";
import { CoopsContext } from "../CoopsContext";

type CoopContextType = {
	coop: Coop | null;
	updateCoop: (coop: Coop) => void;
};

type CoopContextProviderProps = {
	children: React.ReactNode;
};

export const CoopContext = createContext<CoopContextType>({
	coop: null,
	updateCoop: () => {},
});

export const CoopContextProvider = ({ children }: CoopContextProviderProps) => {
	const { coops, setCoops } = useContext(CoopsContext);
	let coop: Coop | null = null;

	const updateCoop = (coop: Coop) => {
		setCoops(coops.map((p) => (p.id === coop.id ? coop : p)));
	};
	if (coop === null) {
		const path = window.location.pathname;
		const segments = path.split("/");
		const index = segments.indexOf("coops");
		if (index !== -1 && segments[index + 1]) {
			const coopId = segments[index + 1]; // Directly use the segment as a string ID
			coop =
				coops.find(
					(c) => c.id === coopId, // Compare as strings
				) ?? null;
		}
	}

	return (
		<CoopContext.Provider value={{ coop, updateCoop }}>
			{children}
		</CoopContext.Provider>
	);
};
