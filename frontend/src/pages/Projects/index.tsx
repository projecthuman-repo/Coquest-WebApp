import React, { useContext, useEffect } from "react";
import { Typography, Tab, Tabs } from "@mui/material";
import { styled } from "@mui/system";
import SearchBar from "../../components/SearchBar";
import ProjectListDisplay from "./components/ViewAllProjects/ProjectListDisplay";
import { ProjectsContext } from "./ProjectsContext";

import { subscribeToUserModelSubject } from "@/observers/userobserver";
import { User } from "@/models/usermodel";

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
	maxWidth: "33.333%",
	fontSize: "16px",
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

	return <div hidden={value !== index}>{value === index && children}</div>;
}

const ViewAllProjects = () => {
	const { projects } = useContext(ProjectsContext);
	const [value, setValue] = React.useState("one");
	const [user, setUser] = React.useState<User>();

	const completedProjects = projects.filter(
		(project) => project.progress === 100,
	);
	const createdByMeProjects = projects.filter(
		(project) => project.userID === user?.id,
	);
	const participatingInProjects = projects.filter(
		(project) => project.members?.some((member) => member._id === user?.id), // member._id is User ID of the member
	);
	const otherProjects = projects.filter(
		(project) =>
			!createdByMeProjects.includes(project) &&
			!participatingInProjects.includes(project) &&
			!completedProjects.includes(project),
	);

	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		setValue(newValue);
	};

	useEffect(() => {
		let unsubscribe: (() => void) | null | undefined = null;

		const setupSubscription = async () => {
			unsubscribe = await subscribeToUserModelSubject((user) => {
				setUser(user); // Update to use the 'name' field
			});
		};

		setupSubscription();

		return () => {
			if (unsubscribe) {
				unsubscribe(); // Ensure proper cleanup on component unmount
			}
		};
	}, []);

	return (
		<Container>
			<Header>
				<TitleField>Projects</TitleField>
				<SearchBar placeholder="Search nearby" />
			</Header>
			<Spacer />
			<CustomTabs
				TabIndicatorProps={{ style: { backgroundColor: "black" } }}
				value={value}
				onChange={handleChange}
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
					label="Created by me"
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
					label="Participating in"
				/>
				<CustomTab
					style={
						value === "three"
							? tabStyle.active_tab
							: tabStyle.default_tab
					}
					value="three"
					sx={{ textTransform: "none" }}
					label="Completed"
				/>
				<CustomTab
					style={
						value === "four"
							? tabStyle.active_tab
							: tabStyle.default_tab
					}
					value="four"
					sx={{ textTransform: "none" }}
					label="Other"
				/>
			</CustomTabs>
			<TabPanel value={value} index="one">
				<ProjectListDisplay projectList={createdByMeProjects} />
			</TabPanel>
			<TabPanel value={value} index="two">
				<ProjectListDisplay projectList={participatingInProjects} />
			</TabPanel>
			<TabPanel value={value} index="three">
				<ProjectListDisplay projectList={completedProjects} />
			</TabPanel>
			<TabPanel value={value} index="four">
				<ProjectListDisplay projectList={otherProjects} />
			</TabPanel>
		</Container>
	);
};

export default ViewAllProjects;
