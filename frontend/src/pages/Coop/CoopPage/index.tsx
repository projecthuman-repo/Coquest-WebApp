import React, { useContext, useEffect } from "react";
import { Typography, Tab, Tabs } from "@mui/material";
import { styled } from "@mui/system";
import OutlineButton from "../../../components/Buttons/OutlineButton";

import SignUpModal from "../components/SignUpModal/SignUpModal";
import ConfirmationModal from "../components/SignUpModal/ConfirmationModal";

import CoopOverview from "./Overview";
import CoopMilestones from "./Milestones";
import CoopVolunteering from "./Volunteering";
import CoopBids from "./Bids";
import CoopOffer from "./Offer";
import CoopDiscussions from "./Discussions";

import graphQLClient from "@/apiInterface/client";

import "./index.css";
import { JOIN_COOP_MUTATION } from "@/apiInterface/gqlOperations";
import { subscribeToUserModelSubject } from "@/observers/userobserver";
import { User } from "@/models/usermodel";
import { CoopContext } from "./CoopContext";

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

const CoopPage = () => {
	const [value, setValue] = React.useState("one"); // which tab on coop page user is on
	const [user, setUser] = React.useState<User>();
	const { coop } = useContext(CoopContext);
	// coop sign up
	const [coopSignUp, setCoopSignUp] = React.useState(
		coop?.members?.find((member) => member?.userID === user?.id)
			? true
			: false,
	);
	const [coopSignUpStarted, setCoopSignUpStarted] = React.useState(false);
	const [confirmationNumber, setConfirmationNumber] = React.useState(0);

	const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
		setValue(newValue);
	};

	const handleSignUpModal = () => {
		setCoopSignUpStarted(!coopSignUpStarted);

		if (!coopSignUpStarted) {
			document.body.style.overflow = "hidden";
			window.scrollTo(0, 0);
		} else document.body.style.overflow = "auto";
	};

	const handleSignUp = async () => {
		if (!coop?._id) throw new Error("Coop ID not found in CoopPage");
		if (!user?.id) throw new Error("User ID not found in CoopPage");
		await graphQLClient
			.request(JOIN_COOP_MUTATION, {
				userInput: { coopID: coop?._id, userID: user?.id },
			})
			.then(() => {
				setCoopSignUp(true);
				setConfirmationNumber(Math.floor(Math.random() * 1000000)); // TODO: fetch confirmation number from backend
			})
			.catch(console.error);
		//TODO: send email to user with additional details about the coop
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

	if (!coop) {
		return (
			<Container>
				<TitleField>Coop Not Found</TitleField>
			</Container>
		);
	}

	return (
		<>
			{coop ? (
				<Container>
					{/* Step 1 of Coop SignUp process */}
					{coopSignUpStarted && !coopSignUp && (
						<SignUpModal
							name={coop?.name ?? ""}
							cost={coop.cost}
							handleSignUpModal={handleSignUpModal}
							handleSignUp={handleSignUp}
						/>
					)}

					{/* Step 2 of Coop SignUp process */}
					{coopSignUpStarted && coopSignUp && (
						<ConfirmationModal
							name={coop.name ?? ""}
							time={coop.recurring ?? ""}
							startDate={coop.startDate ?? ""}
							endDate={coop.endDate ?? ""}
							location={coop?.location?.name ?? ""}
							cost={coop.cost}
							confirmationNumber={confirmationNumber}
							handleSignUpModal={handleSignUpModal}
						/>
					)}

					<Header>
						<TitleField>{coop.name}</TitleField>
						<OutlineButton
							name={coopSignUp ? "Signed up" : "Sign up"}
							onClick={coopSignUp ? undefined : handleSignUpModal}
							filled={coopSignUp}
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
						<CoopOverview />
					</TabPanel>
					<TabPanel value={value} index="two">
						<CoopMilestones />
					</TabPanel>
					<TabPanel value={value} index="three">
						<CoopVolunteering />
					</TabPanel>
					<TabPanel value={value} index="four">
						<CoopBids />
					</TabPanel>
					<TabPanel value={value} index="five">
						<CoopOffer />
					</TabPanel>
					<TabPanel value={value} index="six">
						<CoopDiscussions />
					</TabPanel>

					<Spacer />
				</Container>
			) : (
				<Container>
					<TitleField>Coop Not Found</TitleField>
				</Container>
			)}
		</>
	);
};

export default CoopPage;
