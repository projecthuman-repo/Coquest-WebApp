import React, { useState, useEffect } from "react";
import { styled } from "@mui/material";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { RadioGroupField } from "../../ProgramComponents/RadioGroupField";
import AddContainer from "../../ProgramComponents/AddContainer";
import BasicDateRangePicker from "../../ProgramComponents/DateRange";
import BasicTimeRangePicker from "../../ProgramComponents/TimeRange";
import LocationSearch from "../../ProgramComponents/LocationSearch";
import SkillsCertsSearch from "../../ProgramComponents/SkillsCertsSearch";

const ContentView = styled("div")({
	minWidth: 300,
	display: "flex",
	flexDirection: "column",
	width: "60vw",
	maxWidth: 700,
	marginBottom: 141,
});
const TitleField = styled(Typography)({
	marginTop: 5,
	fontWeight: 600,
	fontSize: 24,
	textAlign: "center",
});
const Spacer = styled("div")({
	width: "100%",
	height: 26,
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

const Operations = () => {
	const [skills, setSkills] = useState<string[]>([]);

	const [startDate, setStartDate] = useState<Date | null>(null);
	const [endDate, setEndDate] = useState<Date | null>(null);

	const [startTime, setStartTime] = useState<Date | null>(null);
	const [endTime, setEndTime] = useState<Date | null>(null);

	const [_startDateTime, setStartDateTime] = useState<Date>();
	const [_endDateTime, setEndDateTime] = useState<Date>();

	const [_recurringChoice, setRecurringChoice] = useState<string>();
	const [_programOwnership, setProgramOwnership] = useState<string>();
	const [_rentalSpace, setRentalSpace] = useState<string>();
	const [additionalInfo, setAdditionalInfo] = useState<string>();
	const [responsibilities, setResponsibilities] = useState<string>();

	const handleDateRangeChange = (start: Date | null, end: Date | null) => {
		setStartDate(start);
		setEndDate(end);
	};

	const handleTimeRangeChange = (start: Date | null, end: Date | null) => {
		setStartTime(start);
		setEndTime(end);
	};

	// Handles setting the recurring choice to its state
	const handleRecurringChoice = (value: string) => {
		setRecurringChoice(value);
	};

	// Handles setting the programOwnership to its state
	const handleProgramOwnership = (value: string) => {
		setProgramOwnership(value);
	};

	// Handles setting the rentalSpace to its state
	const handleRentalSpace = (value: string) => {
		setRentalSpace(value);
	};

	//Handles setting the addition Info to its state
	const handleAdditionalInfoChange = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		setAdditionalInfo(event.target.value);
	};

	//Handles setting additional responsibilities
	const handleResponsibilitiesChange = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		setResponsibilities(event.target.value);
	};

	const _handleSetDateAndTime = () => {
		const syear: number =
			startDate?.getFullYear() ?? new Date().getFullYear();
		const smonth: number = startDate?.getMonth() ?? new Date().getMonth();
		const sday: number = startDate?.getDate() ?? new Date().getDate();
		console.log(startTime);
		const shour: number | undefined = startTime?.getHours();
		const sminutes: number | undefined = startTime?.getMinutes();
		console.log(shour);
		const eyear: number =
			endDate?.getFullYear() ?? new Date().getFullYear();
		const emonth: number = endDate?.getMonth() ?? new Date().getMonth();
		const eday: number = endDate?.getDate() ?? new Date().getDate();

		const ehour: number | undefined = endTime?.getHours();
		const eminutes: number | undefined = endTime?.getMinutes();

		const newStartDate = new Date(syear, smonth, sday, shour, sminutes);
		const newEndDate = new Date(eyear, emonth, eday, ehour, eminutes);

		setStartDateTime(newStartDate);
		setEndDateTime(newEndDate);
	};

	const addPosition = () => {
		console.log("Adding position to be implemented");
	};

	useEffect(() => {
		const tempSkills: string[] = [
			"customer service",
			"Microsoft Excel",
			"organization",
			"accounting",
		];
		setSkills(tempSkills);
	}, []);

	return (
		<ContentView>
			<TitleField>Operations</TitleField>
			<SubtitleField>Time and date</SubtitleField>
			<BasicDateRangePicker onDateRangeChange={handleDateRangeChange} />
			<BasicTimeRangePicker onTimeRangeChange={handleTimeRangeChange} />
			<RadioGroupField
				label="Recurring:"
				name="recurring-btn-group"
				options={[
					{ value: "daily", label: "Daily" },
					{ value: "weekly", label: "Weekly" },
					{ value: "monthly", label: "Monthly" },
					{ value: "custom", label: "Custom" },
				]}
				onChange={handleRecurringChoice}
			/>
			<SubtitleField>Location</SubtitleField>
			<LocationSearch />
			<RadioGroupField
				label="Do you own the program space?"
				name="programspace-btn-group"
				options={[
					{ value: "yes", label: "Yes" },
					{ value: "no", label: "No" },
				]}
				onChange={handleProgramOwnership}
			/>
			<RadioGroupField
				label="Have you booked the rental space?"
				name="rentalSpace-btn-group"
				options={[
					{ value: "yes", label: "Yes" },
					{ value: "no", label: "No" },
				]}
				onChange={handleRentalSpace}
			/>
			<StyledTextField
				label="Additional Information"
				placeholder="Include details about space rentals, regulations, fees, or anything else about the location"
				className="placeholder-mod"
				value={additionalInfo}
				onChange={handleAdditionalInfoChange}
				InputLabelProps={{
					shrink: true,
				}}
				multiline
				rows={4}
			/>
			<Spacer />
			<SubtitleField>Volunteer opportunities</SubtitleField>
			<StyledTextField
				label="Responsibilities"
				placeholder="Provide a brief description of the position's responsibilities."
				className="placeholder-mod"
				value={responsibilities}
				onChange={handleResponsibilitiesChange}
				InputLabelProps={{
					shrink: true,
				}}
				multiline
				rows={4}
			/>
			<SkillsCertsSearch
				skills={skills}
				label="Search Skills and Certifications"
			/>
			<AddContainer label="Add another position" onClick={addPosition} />
		</ContentView>
	);
};

export default Operations;
