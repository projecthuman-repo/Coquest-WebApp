import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Typography, Tab, Tabs } from "@mui/material";
import { styled } from "@mui/system";
import OutlineButton from "../../../components/Buttons/OutlineButton";

import SignUpModal from "../../Programs/components/SignUpModal/SignUpModal";
import ConfirmationModal from "../../Programs/components/SignUpModal/ConfirmationModal";

import ProjectOverview from "./Overview";
import ProjectMilestones from "./Milestones";
import ProjectVolunteering from "./Volunteering";
import ProjectBids from "./Bids";
import ProjectOffer from "./Offer";
import ProjectDiscussions from "./Discussions";

import { Project } from "../../../models/projectModel";
import { ProjectsContext } from "../ProjectsContext";
import { ProjectContext } from "./ProjectContext";

import "./index.css";

const Container = styled("div")({
	display: "flex",
	margin: "auto",
	marginTop: 40,
	width: "70%",
	alignItems: "center",
	justifyContent: "center",
	flexDirection: "column",
});

const TitleField = styled(Typography)(({ theme }) => ({
	marginTop: 5,
	fontWeight: 650,
	fontSize: 48,
	textAlign: "center",
	[theme.breakpoints.down("md")]: {
		fontSize: 32,
	},
	[theme.breakpoints.down("sm")]: {
		fontSize: 26,
	},
}));

const Spacer = styled("div")({
	width: "100%",
	height: 26,
});

const Header = styled("div")(({ theme }) => ({
	width: "100%",
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
	[theme.breakpoints.down("sm")]: {
		flexDirection: "column",
	},
}));

const CustomTabs = styled(Tabs)({
	width: "100%",
	color: "black !important",
	display: "flex",
	justifyContent: "space-between",
});
const CustomTab = styled(Tab)({
	flex: "1",
	maxWidth: "16.666%",
	fontSize: "14px",
});
const tabStyle = {
	default_tab: {
		color: "#000000",
		opacity: 0.3,
		borderBottom: "2px solid rgba(0, 0, 0, 0.5)",
	},
	active_tab: {
		color: "#000000",
	},
};

function TabPanel(props: any) {
	const { children, value, index } = props;

	return (
		<div hidden={value !== index} style={{ width: "100%" }}>
			{value === index && children}
		</div>
	);
}

const ProjectPage = () => {
	const [value, setValue] = React.useState("one"); // which tab on project page user is on

	const { id } = useParams() as { id: string };
	const { projects, setProjects } = useContext(ProjectsContext);
	const [project, setProject] = React.useState<Project | null>(
		projects.filter((project) => project.id === parseInt(id))[0],
	);

	// project sign up
	const [projectSignUp, setProjectSignUp] = React.useState(false);
	const [projectSignUpStarted, setProjectSignUpStarted] =
		React.useState(false);
	const [confirmationNumber, setConfirmationNumber] = React.useState(0);
	

	const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
		setValue(newValue);
	};

	const handleSignUpModal = () => {
		setProjectSignUpStarted(!projectSignUpStarted);

		if (!projectSignUpStarted) {
			document.body.style.overflow = "hidden";
			window.scrollTo(0, 0);
		} else document.body.style.overflow = "auto";
	};

	const handleSignUp = () => {
		setConfirmationNumber(Math.floor(Math.random() * 1000000)); // TODO: fetch confirmation number from backend
		//TODO: send email to user with additional details about the project
		setProjectSignUp(true);
		//TODO send post request to backend to sign up for project
	};

	useEffect(() => {
		setProjects(projects.map((p) => (p.id === project?.id ? project : p))); // updates projects if project was modified
	}, [project, projects, setProjects]);

	return (
		<>
			{project ? (
				<Container>
					{/* Step 1 of Project SignUp process */}
					{projectSignUpStarted && !projectSignUp && (
						<SignUpModal
							name={project.name}
							cost={project.cost}
							handleSignUpModal={handleSignUpModal}
							handleSignUp={handleSignUp}
						/>
					)}

					{/* Step 2 of Project SignUp process */}
					{projectSignUpStarted && projectSignUp && (
						<ConfirmationModal
							name={project.name}
							time={project.time}
							date={project.date}
							location={project.location}
							cost={project.cost}
							confirmationNumber={confirmationNumber}
							handleSignUpModal={handleSignUpModal}
						/>
					)}

					<Header>
						<TitleField>{project.name}</TitleField>
						<OutlineButton
							name={projectSignUp ? "Signed up" : "Sign up"}
							onClick={
								projectSignUp ? undefined : handleSignUpModal
							}
							filled={projectSignUp}
						/>
					</Header>
					<Spacer />
					<CustomTabs
						TabIndicatorProps={{
							style: { backgroundColor: "black" },
						}}
						value={value}
						onChange={handleTabChange}
						aria-label="wrapped label tabs example"
					>
						<CustomTab
							style={
								value === "one"
									? tabStyle.active_tab
									: tabStyle.default_tab
							}
							value="one"
							sx={{ textTransform: "none" }}
							label="Overview"
							wrapped
						/>
						<CustomTab
							style={
								value === "two"
									? tabStyle.active_tab
									: tabStyle.default_tab
							}
							value="two"
							sx={{ textTransform: "none" }}
							label="Milestones"
						/>
						<CustomTab
							style={
								value === "three"
									? tabStyle.active_tab
									: tabStyle.default_tab
							}
							value="three"
							sx={{ textTransform: "none" }}
							label="Volunteering"
						/>
						<CustomTab
							style={
								value === "four"
									? tabStyle.active_tab
									: tabStyle.default_tab
							}
							value="four"
							sx={{ textTransform: "none" }}
							label="Open bids"
						/>
						<CustomTab
							style={
								value === "five"
									? tabStyle.active_tab
									: tabStyle.default_tab
							}
							value="five"
							sx={{ textTransform: "none" }}
							label="Make an offer"
						/>
						<CustomTab
							style={
								value === "six"
									? tabStyle.active_tab
									: tabStyle.default_tab
							}
							value="six"
							sx={{ textTransform: "none" }}
							label="Discussions"
						/>
					</CustomTabs>
					<TabPanel value={value} index="one">
						<ProjectContext.Provider
							value={{ project, setProject }}
						>
							<ProjectOverview />
						</ProjectContext.Provider>
					</TabPanel>
					<TabPanel value={value} index="two">
						<ProjectContext.Provider
							value={{ project, setProject }}
						>
							<ProjectMilestones />
						</ProjectContext.Provider>
					</TabPanel>
					<TabPanel value={value} index="three">
						<ProjectContext.Provider
							value={{ project, setProject }}
						>
							<ProjectVolunteering />
						</ProjectContext.Provider>
					</TabPanel>
					<TabPanel value={value} index="four">
						<ProjectBids />
					</TabPanel>
					<TabPanel value={value} index="five">
						<ProjectOffer />
					</TabPanel>
					<TabPanel value={value} index="six">
						<ProjectDiscussions />
					</TabPanel>

					<Spacer />
				</Container>
			) : (
				<Container>
					<TitleField>Project Not Found</TitleField>
				</Container>
			)}
		</>
	);
};

export default ProjectPage;
