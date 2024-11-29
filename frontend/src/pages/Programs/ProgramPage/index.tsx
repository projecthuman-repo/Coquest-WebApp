import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Repository from "../../../repositories/repository";
import { Typography, Tab, Tabs } from "@mui/material";
import { styled } from "@mui/system";
import OutlineButton from "../../../components/Buttons/OutlineButton";

import SignUpModal from "../components/SignUpModal/SignUpModal";
import ConfirmationModal from "../components/SignUpModal/ConfirmationModal";

import ProgramOverview from "./Overview";
import ProgramMilestones from "./Milestones";
import ProgramVolunteering from "./Volunteering";
import ProgramBids from "./Bids";
import ProgramOffer from "./Offer";
import ProgramDiscussions from "./Discussions";

import { Program } from "../../../models/programModel";
import { ProgramsContext } from "../ProgramsContext";
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

	const { id } = useParams() as { id: string };
	// const { programs, setPrograms } = useContext(ProgramsContext);
	// const [program, setProgram] = React.useState<Program | null>(
	// 	programs.filter((program) => program.id === id)[0],
	// );
	const [programData, setProgramData] = useState<Program | null>(null);

	// program sign up
	const [programSignUp, setProgramSignUp] = React.useState(false);
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

	const handleSignUp = () => {
		setConfirmationNumber(Math.floor(Math.random() * 1000000)); // TODO: fetch confirmation number from backend
		//TODO: send email to user with additional details about the program
		setProgramSignUp(true);
		//TODO send post request to backend to sign up for program
	};

	// useEffect(() => {
	// 	setPrograms(
	// 		programs.map((p) => {
	// 			if (p.id) {
	// 				return p.id === program?.id ? program : p;
	// 			} else {
	// 				return p;
	// 			}
	// 		}),
	// 	); // updates programs if program was modified
	// }, [program, programs, setPrograms]);

	// Fetch for Program Data
	useEffect(() => {
		const repository = Repository.getInstance("Program", Program);
		const fetchProgram = async () => {
			try {
				// Initialize the default Program data
				const programData = {
					id,
					name: "",
					description: "",
					objective: "",
					initiative: "",
					location: "",
					cost: null,
					progress: null,
					time: null,
					date: null,
					spots: null,
					milestones: [],
					volunteerPositions: [],
					openRoles: [],
				};

				const program = new Program(programData); // Create a Program instance
				const fetchedProgram = await repository
					.fetch(program)
					.toPromise(); // Fetch data from repository

				if (fetchedProgram && fetchedProgram.isValid()) {
					setProgramData(fetchedProgram); // Update state with fetched program data
				} else {
					console.error("Program data not found or invalid");
				}
			} catch (error) {
				console.error("Error fetching program data:", error);
			}
		};
		fetchProgram();
	}, [id]);

	return (
		<>
			{programData ? (
				<Container>
					{/* Step 1 of Program SignUp process */}
					{programSignUpStarted && !programSignUp && (
						<SignUpModal
							name={programData.name}
							cost={programData.cost}
							handleSignUpModal={handleSignUpModal}
							handleSignUp={handleSignUp}
						/>
					)}

					{/* Step 2 of Program SignUp process */}
					{programSignUpStarted && programSignUp && (
						<ConfirmationModal
							name={programData.name}
							time={programData.time}
							date={programData.date}
							location={programData.location}
							cost={programData.cost}
							confirmationNumber={confirmationNumber}
							handleSignUpModal={handleSignUpModal}
						/>
					)}

					<Header>
						<TitleField>{programData.name}</TitleField>
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
						<ProgramContext.Provider
							value={{
								program: programData,
								setProgram: setProgramData,
							}}
						>
							<ProgramOverview />
						</ProgramContext.Provider>
					</TabPanel>
					<TabPanel value={value} index="two">
						<ProgramContext.Provider
							value={{
								program: programData,
								setProgram: setProgramData,
							}}
						>
							<ProgramMilestones />
						</ProgramContext.Provider>
					</TabPanel>
					<TabPanel value={value} index="three">
						<ProgramContext.Provider
							value={{
								program: programData,
								setProgram: setProgramData,
							}}
						>
							<ProgramVolunteering />
						</ProgramContext.Provider>
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
