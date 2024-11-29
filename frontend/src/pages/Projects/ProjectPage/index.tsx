import React, { useContext, useEffect } from "react";
import { Typography, Tab, Tabs } from "@mui/material";
import { styled } from "@mui/system";
import OutlineButton from "@/components/Buttons/OutlineButton";

import SignUpModal from "../../Programs/components/SignUpModal/SignUpModal";
import ConfirmationModal from "../../Programs/components/SignUpModal/ConfirmationModal";

import ProjectOverview from "./Overview";
import ProjectMilestones from "./Milestones";
import ProjectVolunteering from "./Volunteering";
import ProjectBids from "./Bids";
import ProjectOffer from "./Offer";
import ProjectDiscussions from "./Discussions";

import graphQLClient from "@/apiInterface/client";

import "./index.css";
import { JOIN_PROJECT_MUTATION } from "@/apiInterface/gqlOperations";
import { subscribeToUserModelSubject } from "@/observers/userobserver";
import { User } from "@/models/usermodel";
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
	const [user, setUser] = React.useState<User>();
	const { project } = useContext(ProjectContext);
	// project sign up
	const [projectSignUp, setProjectSignUp] = React.useState<boolean>();
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

	const handleSignUp = async () => {
		if (!project?._id)
			throw new Error("Project ID not found in ProjectPage");
		if (!user?.id) throw new Error("User ID not found in ProjectPage");
		await graphQLClient
			.request(JOIN_PROJECT_MUTATION, {
				userInput: { projectID: project?._id, userID: user?.id },
			})
			.then(() => {
				setProjectSignUp(true);
				setConfirmationNumber(Math.floor(Math.random() * 1000000)); // TODO: fetch confirmation number from backend
			})
			.catch(console.error);
		//TODO: send email to user with additional details about the project
	};

	useEffect(() => {
		let unsubscribe: (() => void) | null | undefined = null;

		const setupSubscription = async () => {
			unsubscribe = await subscribeToUserModelSubject((user) => {
				setUser(user);
			});
		};
		setupSubscription();
		return () => {
			if (unsubscribe) {
				unsubscribe();
			}
		};
	}, []);

	useEffect(() => {
		if (project?.members) {
			setProjectSignUp(
				project.members.find((member) => member?._id === user?.id)
					? true
					: false,
			);
		}
	}, [project, user]);

	if (!project) {
		return (
			<Container>
				<TitleField>Project Not Found</TitleField>
			</Container>
		);
	}

	return (
		<>
			{project ? (
				<Container>
					{/* Step 1 of Project SignUp process */}
					{projectSignUpStarted && !projectSignUp && (
						<SignUpModal
							name={project?.name ?? ""}
							cost={project.cost}
							handleSignUpModal={handleSignUpModal}
							handleSignUp={handleSignUp}
						/>
					)}

					{/* Step 2 of Project SignUp process */}
					{projectSignUpStarted && projectSignUp && (
						<ConfirmationModal
							name={project.name ?? ""}
							time={project.recurring ?? ""}
							startDate={project.startDate ?? ""}
							endDate={project.endDate ?? ""}
							location={project?.location?.name ?? ""}
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
						<ProjectOverview />
					</TabPanel>
					<TabPanel value={value} index="two">
						<ProjectMilestones />
					</TabPanel>
					<TabPanel value={value} index="three">
						<ProjectVolunteering />
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
