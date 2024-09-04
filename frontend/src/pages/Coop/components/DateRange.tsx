import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "@emotion/styled";
import { registerLocale } from "react-datepicker";
import en from "date-fns/locale/en-US";
import { TextField } from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

registerLocale("en", en);

const Wrapper = styled.div`
	display: flex;
	gap: 1rem;
`;

const CalendarIcon = styled(EventIcon)({
	marginRight: 19,
});

type StyledTextFieldProps = {
	onDateRangeChange?: (start: Date | null, end: Date | null) => void;
};

const StyledTextField = styled(TextField)<StyledTextFieldProps>`
	&& {
		margin-top: 22px;
		.MuiInputLabel-shrink {
			color: black;
		}
	}
`;
const BasicDateRangePicker: React.FC<StyledTextFieldProps> = ({
	onDateRangeChange,
}) => {
	const [startDate, setStartDate] = useState<Date | null>(null);
	const [endDate, setEndDate] = useState<Date | null>(null);

	const handleStartDateChange = (date: Date | null) => {
		setStartDate(date);
		if (onDateRangeChange) {
			onDateRangeChange(date, endDate);
		}
	};

	const handleEndDateChange = (date: Date | null) => {
		setEndDate(date);
		if (onDateRangeChange) {
			onDateRangeChange(startDate, date);
		}
	};

	const FieldWrapper = styled("div")({
		display: "flex",
		width: "20000px",
		justifyContent: "space-around",
		alignItems: "center",
	});

	return (
		<Wrapper>
			<StyledTextField
				label="Start date"
				fullWidth
				placeholder=""
				disabled
				InputLabelProps={{
					shrink: true,
				}}
				InputProps={{
					startAdornment: (
						<FieldWrapper>
							<CalendarIcon />
							<DatePicker
								selected={startDate}
								onChange={handleStartDateChange}
								selectsStart
								startDate={startDate}
								endDate={endDate}
								dateFormat="MM/dd/yyyy"
								locale="en"
								className="dateTimefield"
							/>
							<KeyboardArrowDownIcon />
						</FieldWrapper>
					),
				}}
			/>
			<StyledTextField
				label="End date"
				fullWidth
				disabled
				placeholder=""
				InputLabelProps={{
					shrink: true,
				}}
				InputProps={{
					startAdornment: (
						<FieldWrapper>
							<CalendarIcon />
							<DatePicker
								selected={endDate}
								onChange={handleEndDateChange}
								selectsEnd
								startDate={startDate}
								endDate={endDate}
								minDate={startDate}
								dateFormat="MM/dd/yyyy"
								locale="en"
								className="dateTimefield"
							/>
							<KeyboardArrowDownIcon />
						</FieldWrapper>
					),
				}}
			/>
		</Wrapper>
	);
};

export default BasicDateRangePicker;
