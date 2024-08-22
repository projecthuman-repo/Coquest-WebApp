import React, { createContext, useState, useContext, useEffect } from "react";
import { Coop } from "../../../models/coopModel";
import { CoopsContext } from "../CoopsContext";

type CoopContextType = {
	coop: Coop | null;
	setCoop: React.Dispatch<React.SetStateAction<Coop | null>>;
};

type CoopContextProviderProps = {
	children: React.ReactNode;
};

export const CoopContext = createContext<CoopContextType>({
	coop: null,
	setCoop: () => {},
});

export const CoopContextProvider = ({
	children,
}: CoopContextProviderProps) => {
	const { coops } = useContext(CoopsContext);
	const [coop, setCoop] = useState<Coop | null>(null);

	useEffect(() => {
		if (coop === null) {
			const path = window.location.pathname;
			const segments = path.split("/");
			const index = segments.indexOf("coops");
			if (index !== -1 && segments[index + 1]) {
				const coopId = parseInt(segments[index + 1], 10);
				if (!isNaN(coopId)) {
					const coop = coops.find(
						(coop) =>
							coop.id?.localeCompare(coopId.toString()) ===
							0,
					);
					if (coop) {
						setCoop(coop);
					}
				}
			}
		}
	}, [coops, coop]);

	return (
		<CoopContext.Provider value={{ coop, setCoop }}>
			{children}
		</CoopContext.Provider>
	);
};
