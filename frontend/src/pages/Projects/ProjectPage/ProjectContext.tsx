import React, { createContext, useState, useContext, useEffect } from "react";
import { Project } from "../../../models/projectModel";
import { ProjectsContext } from "../ProjectsContext";

type ProjectContextType = {
	project: Project | null;
	setProject: React.Dispatch<React.SetStateAction<Project | null>>;
};

type ProjectContextProviderProps = {
	children: React.ReactNode;
};

export const ProjectContext = createContext<ProjectContextType>({
	project: null,
	setProject: () => {},
});

export const ProjectContextProvider = ({
	children,
}: ProjectContextProviderProps) => {
	const { projects } = useContext(ProjectsContext);
	const [project, setProject] = useState<Project | null>(null);

	useEffect(() => {
		if (project === null) {
			const path = window.location.pathname;
			const segments = path.split("/");
			const index = segments.indexOf("projects");
			if (index !== -1 && segments[index + 1]) {
				const projectId = parseInt(segments[index + 1], 10);
				if (!isNaN(projectId)) {
					const project = projects.find(
						(project) => project.id?.localeCompare(projectId.toString()) === 0
					);
					if (project) {
						setProject(project);
					}
				}
			}
		}
	}, [projects, project]);

	return (
		<ProjectContext.Provider value={{ project, setProject }}>
			{children}
		</ProjectContext.Provider>
	);
};
