import React, { useContext, useEffect } from "react";
import { Typography, Tab, Tabs } from "@mui/material";
import { styled } from "@mui/system";
import OutlineButton from "../../../components/Buttons/OutlineButton";

import SignUpModal from "../../Programs/components/SignUpModal/SignUpModal";
import ConfirmationModal from "../../Programs/components/SignUpModal/ConfirmationModal";

import ProgramOverview from "./Overview";
import ProgramMilestones from "./Milestones";
import ProgramVolunteering from "./Volunteering";
import ProgramBids from "./Bids";
import ProgramOffer from "./Offer";
import ProgramDiscussions from "./Discussions";

import graphQLClient from "@/apiInterface/client";

import "./index.css";
import { JOIN_PROGRAM_MUTATION } from "@/apiInterface/gqlStrings/programStrings";
import { subscribeToUserModelSubject } from "@/observers/userobserver";
import { User } from "@/models/usermodel";
import { ProgramContext } from "./ProgramContext";

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

const ProgramPage = () => {
	const [value, setValue] = React.useState("one"); // which tab on program page user is on
	const [user, setUser] = React.useState<User>();
	const { program } = useContext(ProgramContext);
	// program sign up
	const [programSignUp, setProgramSignUp] = React.useState<boolean>();
	const [programSignUpStarted, setProgramSignUpStarted] =
		React.useState(false);
	const [confirmationNumber, setConfirmationNumber] = React.useState(0);

	const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
		setValue(newValue);
	};

	const handleSignUpModal = () => {
		setProgramSignUpStarted(!programSignUpStarted);

		if (!programSignUpStarted) {
			document.body.style.overflow = "hidden";
			window.scrollTo(0, 0);
		} else document.body.style.overflow = "auto";
	};

	const handleSignUp = async () => {
		if (!program?._id)
			throw new Error("Program ID not found in ProgramPage");
		if (!user?.id) throw new Error("User ID not found in ProgramPage");
		await graphQLClient
			.request(JOIN_PROGRAM_MUTATION, {
				userInput: { programID: program?._id, userID: user?.id },
			})
			.then(() => {
				setProgramSignUp(true);
				setConfirmationNumber(Math.floor(Math.random() * 1000000)); // TODO: fetch confirmation number from backend
			})
			.catch(console.error);
		//TODO: send email to user with additional details about the program
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
		if (program?.members) {
			setProgramSignUp(
				program.members.find((member) => member?._id === user?.id)
					? true
					: false,
			);
		}
	}, [program, user]);

	if (!program) {
		return (
			<Container>
				<TitleField>Program Not Found</TitleField>
			</Container>
		);
	}

	return (
		<>
			{program ? (
				<Container>
					{/* Step 1 of Program SignUp process */}
					{programSignUpStarted && !programSignUp && (
						<SignUpModal
							name={program?.name ?? ""}
							cost={program.cost}
							handleSignUpModal={handleSignUpModal}
							handleSignUp={handleSignUp}
						/>
					)}

					{/* Step 2 of Program SignUp process */}
					{programSignUpStarted && programSignUp && (
						<ConfirmationModal
							name={program.name ?? ""}
							time={program.recurring ?? ""}
							startDate={program.startDate ?? ""}
							endDate={program.endDate ?? ""}
							location={program?.location?.name ?? ""}
							cost={program.cost}
							confirmationNumber={confirmationNumber}
							handleSignUpModal={handleSignUpModal}
						/>
					)}

					<Header>
						<TitleField>{program.name}</TitleField>
						<OutlineButton
							name={programSignUp ? "Signed up" : "Sign up"}
							onClick={
								programSignUp ? undefined : handleSignUpModal
							}
							filled={programSignUp}
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
						<ProgramOverview />
					</TabPanel>
					<TabPanel value={value} index="two">
						<ProgramMilestones />
					</TabPanel>
					<TabPanel value={value} index="three">
						<ProgramVolunteering />
					</TabPanel>
					<TabPanel value={value} index="four">
						<ProgramBids />
					</TabPanel>
					<TabPanel value={value} index="five">
						<ProgramOffer />
					</TabPanel>
					<TabPanel value={value} index="six">
						<ProgramDiscussions />
					</TabPanel>

					<Spacer />
				</Container>
			) : (
				<Container>
					<TitleField>Program Not Found</TitleField>
				</Container>
			)}
		</>
	);
};

export default ProgramPage;
