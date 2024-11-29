import React from "react";
import { styled } from "@mui/system";
import ProjectPane from "./ProjectPane";
import { Project } from "../../../../models/projectModel";

const Container = styled("div")({
	display: "flex",
	margin: "auto",
	marginTop: 40,
	width: "100%",
	alignItems: "center",
	flexDirection: "column",
	overflowY: "scroll",
	height: 600,
	"&::-webkit-scrollbar": {
		width: "5px",
	},
	"&::-webkit-scrollbar-thumb": {
		backgroundColor: "rgba(0,0,0,.38)",
		borderRadius: "4px",
	},
	"&::-webkit-scrollbar-track": {
		backgroundColor: "rgba(0,0,0,.15)",
		borderRadius: "4px",
	},
});

interface ProjectProps {
	projectList: Project[];
}
const Breaker = styled("hr")({
	height: 2,
	width: "90%",
});

function ProjectListDisplay(props: ProjectProps) {
	const validProjectList: Project[] =
		props.projectList.filter(validateProject);

	return (
		<Container>
			{validProjectList.map((project, index) => {
				return (
					<React.Fragment key={index}>
						<ProjectPane project={project} />
						{index + 1 <= props.projectList.length && (
							<Breaker></Breaker>
						)}
					</React.Fragment>
				);
			})}
		</Container>
	);
}

function validateProject(project: Project) {
	if (
		project === null ||
		project.name === null ||
		project.name === "" ||
		project.summary === null ||
		project.summary === ""
	) {
		return false;
	}
	return true;
}
export default ProjectListDisplay;
