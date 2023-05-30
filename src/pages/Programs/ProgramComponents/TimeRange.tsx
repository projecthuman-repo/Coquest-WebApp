import React, { useState } from "react";
import TimePicker, { TimePickerValue } from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import styled from "@emotion/styled";
import { TextField } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const Wrapper = styled.div`
	display: flex;
	gap: 1rem;
`;

const ClockIcon = styled(AccessTimeIcon)({
	marginRight: 19,
});

type StyledTextFieldProps = {
	onTimeRangeChange?: (start: Date | null, end: Date | null) => void;
};

const StyledTextField = styled(TextField)<StyledTextFieldProps>`
	&& {
		margin-top: 22px;
		.MuiInputLabel-shrink {
			color: black;
		}
	}
`;

const BasicTimeRangePicker: React.FC<StyledTextFieldProps> = ({
	onTimeRangeChange,
}) => {
	const [startTime, setStartTime] = useState<Date | null>(null);
	const [endTime, setEndTime] = useState<Date | null>(null);

	const handleStartTime = (time: TimePickerValue) => {
		const newDate = startTime || new Date();

		if (typeof time === "string") {
			const [hours, minutes] = time.split(":");
			newDate.setHours(Number(hours));
			newDate.setMinutes(Number(minutes));
		} else {
			newDate.setHours(time.getHours());
			newDate.setMinutes(time.getMinutes());
		}
		setStartTime(newDate);

		if (onTimeRangeChange) {
			onTimeRangeChange(newDate, endTime);
		}
	};

	const handleEndTime = (time: TimePickerValue) => {
		const newDate = endTime || new Date();
		if (typeof time === "string") {
			const [hours, minutes] = time.split(":");
			newDate.setHours(Number(hours));
			newDate.setMinutes(Number(minutes));
		} else {
			newDate.setHours(time.getHours());
			newDate.setMinutes(time.getMinutes());
		}
		setEndTime(newDate);
		if (onTimeRangeChange) {
			onTimeRangeChange(startTime, newDate);
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
				label="Start time"
				fullWidth
				disabled
				placeholder=""
				InputLabelProps={{
					shrink: true,
				}}
				InputProps={{
					startAdornment: (
						<FieldWrapper>
							<ClockIcon />
							<TimePicker
								className="timeField"
								clockIcon={null}
								clearIcon={null}
								value={
									startTime?.toLocaleTimeString() ||
									new Date()
								}
								onChange={handleStartTime}
							/>

							<KeyboardArrowDownIcon />
						</FieldWrapper>
					),
				}}
			/>
			<StyledTextField
				label="End time"
				fullWidth
				disabled
				placeholder=""
				InputLabelProps={{
					shrink: true,
				}}
				InputProps={{
					startAdornment: (
						<FieldWrapper>
							<ClockIcon />
							<TimePicker
								className="timeField"
								clockIcon={null}
								clearIcon={null}
								value={
									endTime?.toLocaleTimeString() || new Date()
								}
								onChange={handleEndTime}
							/>
							<KeyboardArrowDownIcon />
						</FieldWrapper>
					),
				}}
			/>
		</Wrapper>
	);
};

export default BasicTimeRangePicker;
