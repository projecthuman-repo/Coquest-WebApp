import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Typography, Tab, Tabs } from "@mui/material";
import { styled } from "@mui/system";
import OutlineButton from "../../../components/Buttons/OutlineButton";
import PrimaryButton from "../../../components/Buttons/PrimaryButton";
import Input from "../../../components/Input";

import ProgramOverview from "./Overview";
import ProgramMilestones from "./Milestones";
import ProgramVolunteering from "./Volunteering";
import ProgramBids from "./Bids";
import ProgramOffer from "./Offer";
import ProgramDiscussions from "./Discussions";

import { Program } from "../../../models/programModel";
import { ProgramsContext } from "../ProgramsContext";
import { ProgramContext } from "./ProgramContext";

// interface ProgramPageProps {
// 	//program: Program;
// 	id: string;
// }

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
	const { programs, setPrograms } = useContext(ProgramsContext);
	const [program, setProgram] = React.useState<Program | null>(
		programs.filter((program) => program.id === parseInt(id))[0],
	);

	// program sign up
	const [programSignUp, setProgramSignUp] = React.useState(false);
	const [programSignUpStarted, setProgramSignUpStarted] =
		React.useState(false);
	const [signupName, setSignupName] = React.useState("");
	const [signupAddress, setSignupAddress] = React.useState("");
	const [signupPhone, setSignupPhone] = React.useState("");
	const [signupEmail, setSignupEmail] = React.useState("");
	const [signupTermsAgreed, setSignupTermsAgreed] = React.useState(false);
	const [signupCardNumber, setSignupCardNumber] = React.useState("");
	const [signupCardHolder, setSignupCardHolder] = React.useState("");
	const [signupCardExpiration, setSignupCardExpiration] = React.useState("");
	const [signupCardCVV, setSignupCardCVV] = React.useState("");
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

	useEffect(() => {
		setPrograms(programs.map((p) => (p.id === program?.id ? program : p))); // updates programs if program was modified
	}, [program]);

	return (
		<>
			{program ? (
				<Container>
					{/* Step 1 of Program SignUp process */}
					{programSignUpStarted && !programSignUp && (
						<div className="signup-modal-container">
							<div className="signup-modal">
								<div className="signup-header">
									<p>Sign up for {program.name}</p>
									<button onClick={handleSignUpModal}>
										<img
											src="/icons/close-grey.png"
											alt="Close Icon"
										/>
									</button>
								</div>

								<div className="signup-modal-content">
									<div className="signup-form">
										<div className="participant-info">
											<p className="bolded">
												Participant Information
											</p>
											<Input label="Full name">
												<input
													type="text"
													placeholder=""
													value={signupName}
													onChange={(e) =>
														setSignupName(
															e.target.value,
														)
													}
												/>
											</Input>
											<Input label="Address">
												<input
													type="text"
													placeholder=""
													value={signupAddress}
													onChange={(e) =>
														setSignupAddress(
															e.target.value,
														)
													}
												/>
											</Input>
											<Input label="Phone Number">
												<input
													type="text"
													placeholder=""
													value={signupPhone}
													onChange={(e) =>
														setSignupPhone(
															e.target.value,
														)
													}
												/>
											</Input>
											<Input label="Email Address">
												<input
													type="email"
													placeholder=""
													value={signupEmail}
													onChange={(e) =>
														setSignupEmail(
															e.target.value,
														)
													}
												/>
											</Input>
											<div className="terms-conditions">
												<input
													type="checkbox"
													checked={signupTermsAgreed}
													onChange={(e) =>
														setSignupTermsAgreed(
															e.target.checked,
														)
													}
													id="terms-agreed"
													name="terms-agreed"
												/>
												{/* TODO add proper link to terms and conditions */}
												<label htmlFor="terms-agreed">
													I agree to with{" "}
													<a href="#">
														Terms and Conditions
													</a>
												</label>
											</div>
										</div>
										<div className="payment-info">
											<p className="bolded">
												Payment Information
											</p>
											<Input label="Credit/Debit card number">
												<input
													type="text"
													placeholder=""
													value={signupCardNumber}
													onChange={(e) =>
														setSignupCardNumber(
															e.target.value,
														)
													}
												/>
											</Input>
											<Input label="Card holder">
												<input
													type="text"
													placeholder=""
													value={signupCardHolder}
													onChange={(e) =>
														setSignupCardHolder(
															e.target.value,
														)
													}
												/>
											</Input>
											<div className="card-info-exp-cvv">
												<Input label="Expiration date">
													<input
														type="text"
														placeholder=""
														value={
															signupCardExpiration
														}
														onChange={(e) =>
															setSignupCardExpiration(
																e.target.value,
															)
														}
													/>
												</Input>
												<Input label="CVV">
													<input
														type="text"
														placeholder=""
														value={signupCardCVV}
														onChange={(e) =>
															setSignupCardCVV(
																e.target.value,
															)
														}
													/>
												</Input>
											</div>
										</div>
									</div>

									<div className="payment-summary">
										<p className="bolded">Payment</p>
										<hr></hr>
										<div>
											<div>
												<p>Program Cost</p>
												<p>${program.cost}</p>
											</div>
											<div>
												<p>Fees</p>
												{/* TODO add a formula how fees are calculated */}
												<p>$0.50</p>
											</div>
										</div>
										<hr></hr>
										<div>
											<div>
												<p className="bolded">
													Total cost
												</p>
												{/* TODO add a formula how fees are calculated */}
												<p>
													$
													{program.cost
														? (
																program.cost +
																0.5
															).toFixed(2)
														: ""}
												</p>
											</div>
										</div>
									</div>
								</div>

								<div className="signup">
									<PrimaryButton
										name="Sign up"
										onClick={handleSignUp}
									/>
								</div>
							</div>
						</div>
					)}

					{/* Step 2 of Program SignUp process */}
					{programSignUpStarted && programSignUp && (
						<div className="signup-modal-container">
							<div className="signup-modal">
								<div className="signup-header">
									<p>Sign up for {program.name}</p>
									<button onClick={handleSignUpModal}>
										<img
											src="/icons/close-grey.png"
											alt="Close Icon"
										/>
									</button>
								</div>

								<div className="confirmation-form">
									<p className="bolded">
										You have successfully signed up for{" "}
										{program.name}
									</p>
									<p>{confirmationNumber}</p>
									<p>
										Check your email for additional details
										about the program.
									</p>
									<div>
										<p>
											<span className="bolded">
												Time:{" "}
											</span>
											{program.time}
										</p>
										<p>
											<span className="bolded">
												Date:{" "}
											</span>
											{program.date}
										</p>
										<p>
											<span className="bolded">
												Location:{" "}
											</span>
											{program.location}
										</p>
										<p>
											<span className="bolded">
												Cost:{" "}
											</span>
											${program.cost}
										</p>
									</div>
								</div>

								<div className="signup">
									<PrimaryButton
										name="Finish"
										onClick={handleSignUpModal}
									/>
								</div>
							</div>
						</div>
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
						<ProgramContext.Provider
							value={{ program, setProgram }}
						>
							<ProgramOverview />
						</ProgramContext.Provider>
					</TabPanel>
					<TabPanel value={value} index="two">
						<ProgramContext.Provider
							value={{ program, setProgram }}
						>
							<ProgramMilestones />
						</ProgramContext.Provider>
					</TabPanel>
					<TabPanel value={value} index="three">
						<ProgramContext.Provider
							value={{ program, setProgram }}
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
