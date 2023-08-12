import TextField from "@mui/material/TextField";

import { Checkbox, styled, Typography } from "@mui/material";
import React, { useState } from "react";
import BudgetingGrid from "../../ProgramComponents/BudgetingGrid";
import { RadioGroupField } from "../../ProgramComponents/RadioGroupField";
import DateComponent from "../../ProgramComponents/DateComponent";

const ContentView = styled("div")({
	minWidth: 300,
	display: "flex",
	flexDirection: "column",
	width: "60vw",
	maxWidth: 700,
	marginBottom: 142,
});

const TitleField = styled(Typography)({
	marginTop: 5,
	fontWeight: 600,
	fontSize: 24,
	textAlign: "center",
});
const Spacer = styled("div")({
	width: "100%",
	height: 10,
});
const LargeSpacer = styled("div")({
	width: "100%",
	height: 64,
});
const SubtitleField = styled(Typography)({
	marginTop: 19,
	fontWeight: 600,
	fontSize: 16,
});
type StyledTextFieldProps = {
	label: string;
	placeholder: string;
};

const StyledTextField = styled(TextField)<StyledTextFieldProps>`
	&& {
		margin-top: 28px;
		.MuiInputLabel-shrink {
			color: black;
		}
		& .placeholder-mod::placeholder {
			color: #a1a1a1;
		}
	}
`;

const MaxParticipationContainer = styled("div")({
	display: "flex",
	flexDirection: "column",
	justifyContent: "flex-start",
});

const CheckboxContainer = styled("div")({
	display: "flex",
	alignItems: "center",
});

const Budgeting = () => {
	const [barterChoice, setBarterChoice] = useState<string>();
	const [participationCost, setParticipationCost] = useState<string>();
	const [participationNum, setParticipationNum] = useState<string>();
	const [noLimit, setNoLimit] = useState<boolean>(false);
	const [crowdFundingChoice, setCrowdfundingChoice] = useState<string>();
	const [crowdfundAmount, setCrowdFundAmount] = useState<string>();
	const [message, setMessage] = useState<string>();

	// Handles setting the barter choice to its state
	const handleBarterChoice = (value: string) => {
		setBarterChoice(value);
	};

	// Handles setting the crowd funding to its state
	const handleCrowdFundChoice = (value: string) => {
		setCrowdfundingChoice(value);
	};

	// //Handles setting participation cost
	const handleParticipationCostChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setParticipationCost(event.target.value);
	};
	// //Handles setting crowdfunding cost
	const handleCrowdFundAmountChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setCrowdFundAmount(event.target.value);
	};

	//Handles setting number of participants
	const handleParticipationNumChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setParticipationNum(event.target.value);
	};

	//Handles setting thankyou message
	const handleMessageChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setMessage(event.target.value);
	};

	//Handler for the check
	const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
		setNoLimit(event.target.checked);
	};

	return (
		<ContentView>
			<TitleField>Budgeting</TitleField>
			<SubtitleField>Supplies and Materials</SubtitleField>
			<Spacer />
			<BudgetingGrid />
			<LargeSpacer />
			<RadioGroupField
				label="Are you open to bartering?"
				name="bartering-btn-group"
				options={[
					{ value: "yes", label: "Yes" },
					{ value: "no", label: "No" },
				]}
				onChange={handleBarterChoice}
			/>
			<SubtitleField>Participation</SubtitleField>
			<StyledTextField
				label="Cost to participate"
				placeholder="No cost"
				className="placeholder-mod"
				value={participationCost}
				onChange={handleParticipationCostChange}
				type="number"
				InputLabelProps={{
					shrink: true,
				}}
				InputProps={{
					startAdornment: <>$</>,
					inputProps: { min: 0 },
				}}
			/>
			<MaxParticipationContainer>
				<StyledTextField
					label="Maximum number of participants"
					placeholder=""
					className="placeholder-mod"
					type="number"
					InputProps={{ inputProps: { min: 0 } }}
					value={participationNum}
					onChange={handleParticipationNumChange}
					InputLabelProps={{
						shrink: true,
					}}
					sx={{
						"& .MuiInputBase-input.Mui-disabled": {
							backgroundColor: "#66666620",
							borderRadius: 1,
						},
					}}
					disabled={noLimit}
				/>
				<CheckboxContainer>
					<Checkbox
						checked={noLimit}
						onChange={handleCheck}
						color="default"
					/>
					<Typography>No Limit</Typography>
				</CheckboxContainer>
			</MaxParticipationContainer>
			<SubtitleField>Crowdfunding</SubtitleField>
			<RadioGroupField
				label="Do you need to crowdfund the program?"
				name="bartering-btn-group"
				options={[
					{ value: "yes", label: "Yes" },
					{ value: "no", label: "No" },
				]}
				onChange={handleCrowdFundChoice}
			/>
			<DateComponent />
			<StyledTextField
				label="Crowdfund amount"
				placeholder=""
				className="placeholder-mod"
				value={crowdfundAmount}
				onChange={handleCrowdFundAmountChange}
				InputLabelProps={{
					shrink: true,
				}}
				type="number"
				InputProps={{
					startAdornment: <>$</>,
					inputProps: { min: 0 },
				}}
			/>
			<StyledTextField
				label="Message"
				placeholder="Add a thank you message to backers."
				className="placeholder-mod"
				value={message}
				onChange={handleMessageChange}
				InputLabelProps={{
					shrink: true,
				}}
				multiline
				rows={4}
			/>
		</ContentView>
	);
};

export default Budgeting;
