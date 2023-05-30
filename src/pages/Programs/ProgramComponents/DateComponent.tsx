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

const FieldWrapper = styled("div")({
	display: "flex",
	width: "20000px",
	justifyContent: "space-around",
	alignItems: "center",
});

const DateComponent: React.FC<StyledTextFieldProps> = ({
	onDateRangeChange,
}) => {
	const [date, setDate] = useState<Date | null>(null);
	const handleDateChange = (date: Date | null) => {
		setDate(date);
	};

	return (
		<StyledTextField
			label="Date for funding"
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
							selected={date}
							onChange={handleDateChange}
							selectsStart
							dateFormat="MM/dd/yyyy"
							locale="en"
							className="dateTimefield"
						/>
						<KeyboardArrowDownIcon />
					</FieldWrapper>
				),
			}}
		/>
	);
};

export default DateComponent;
