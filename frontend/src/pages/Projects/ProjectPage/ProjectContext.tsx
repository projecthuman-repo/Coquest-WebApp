import React, { createContext, useContext } from "react";
import { Project } from "../../../models/projectModel";
import { ProjectsContext } from "../ProjectsContext";
import graphQLClient from "@/apiInterface/client";
import { UPDATE_PROJECT_MUTATION } from "@/apiInterface/gqlOperations";

type ProjectContextType = {
	project: Project | null;
	updateProject: (project: Project) => void;
};

type ProjectContextProviderProps = {
	children: React.ReactNode;
};

export const ProjectContext = createContext<ProjectContextType>({
	project: null,
	updateProject: () => {},
});

export const ProjectContextProvider = ({
	children,
}: ProjectContextProviderProps) => {
	const { projects, setProjects } = useContext(ProjectsContext);
	let project: Project | null = null;

	const updateProject = (project: Project) => {
		console.log("Updating project", project);
		// Exclude unwanted fields from the `project` object
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { milestones, progress, members, ...projectInput } = project;
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
			.request(UPDATE_PROJECT_MUTATION, {
				// @ts-expect-error TS thinks title may be undefined; it's filtered above
				userInput: { ...projectInput, milestones: cleanedMilestones },
			})
			.then(console.log)
			.catch(console.error);

		setProjects(projects.map((p) => (p._id === project._id ? project : p)));
	};

	if (project === null) {
		const path = window.location.pathname;
		const segments = path.split("/");
		const index = segments.indexOf("projects");
		if (index !== -1 && segments[index + 1]) {
			const projectId = segments[index + 1]; // Directly use the segment as a string ID
			project =
				projects.find(
					(p) => p._id === projectId, // Compare as strings
				) ?? null;
		}
	}

	return (
		<ProjectContext.Provider value={{ project, updateProject }}>
			{children}
		</ProjectContext.Provider>
	);
};
