import React, { createContext, useContext } from "react";
import { Coop } from "../../../models/coopModel";
import { CoopsContext } from "../CoopsContext";
import graphQLClient from "@/apiInterface/client";
import { UPDATE_COOP_MUTATION } from "@/apiInterface/gqlStrings/coopStrings";

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
		console.log("Updating coop", coop);
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { milestones, recurring, progress, members, ...coopInput } = coop;
		const filteredMilestones = milestones?.filter(
			(milestone) => milestone.title,
		);
		const removedFromMilestones = filteredMilestones?.map((milestone) => {
			// these were removed because they dont exist in schema
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { type, completedBy, ...rest } = milestone;
			return rest;
		});
		graphQLClient
			.request(UPDATE_COOP_MUTATION, {
				// @ts-expect-error TS thinks title maybe undefined, I have filtered it before
				userInput: { ...coopInput, milestones: removedFromMilestones },
			})
			.then(console.log)
			.catch(console.error);
		setCoops(coops.map((p) => (p._id === coop._id ? coop : p)));
	};
	if (coop === null) {
		const path = window.location.pathname;
		const segments = path.split("/");
		const index = segments.indexOf("coops");
		if (index !== -1 && segments[index + 1]) {
			const coopId = segments[index + 1]; // Directly use the segment as a string ID
			coop =
				coops.find(
					(c) => c._id === coopId, // Compare as strings
				) ?? null;
		}
	}

	return (
		<CoopContext.Provider value={{ coop, updateCoop }}>
			{children}
		</CoopContext.Provider>
	);
};
