import React, { useState, useRef } from "react";
import styled from "@emotion/styled";
import {
	TextField,
	Button,
	Popover,
	Typography,
	IconButton,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const Wrapper = styled.div`
	display: flex;
	gap: 1rem;

	@media (max-width: 700px) {
		flex-direction: column;
	}
`;

const StyledTextField = styled(TextField)`
	&& {
		margin-top: 22px;
		.MuiInputLabel-shrink {
			color: black;
		}
		.MuiInputAdornment-root {
			margin-right: 12px;
		}
		.MuiOutlinedInput-root {
			&.Mui-focused .MuiOutlinedInput-notchedOutline {
				border-color: rgba(0, 0, 0, 0.23);
				border-width: 1px;
			}
		}
	}
`;

const TimePickerPopover = styled(Popover)`
	.MuiPopover-paper {
		padding: 16px;
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: #f5f5f5;
		border-radius: 8px;
	}
`;

const ClockIcon = styled(AccessTimeIcon)({
	marginRight: 8,
	color: "rgba(0, 0, 0, 0.38)",
});

const ArrowDownIcon = styled(KeyboardArrowDownIcon)({
	color: "rgba(0, 0, 0, 0.38)",
});

const ClockFace = styled.div`
	width: 200px;
	height: 200px;
	border-radius: 50%;
	background-color: white;
	position: relative;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	margin-bottom: 16px;

	&::after {
		content: "";
		position: absolute;
		top: 50%;
		left: 50%;
		width: 8px;
		height: 8px;
		background-color: #1976d2;
		border-radius: 50%;
		transform: translate(-50%, -50%);
	}
`;

const ClockHand = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	width: 2px;
	height: 30%;
	background-color: #1976d2;
	transform-origin: top center;
	transition: transform 0.3s ease;
`;

const ClockNumber = styled(Button)`
	position: absolute;
	min-width: 30px;
	width: 30px;
	height: 30px;
	padding: 0;
	border-radius: 50%;
	font-weight: bold;
	color: #333;
	background-color: "transparent";
	&:hover {
		background-color: #e0e0e0;
	}
`;

const TimeControls = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	margin-bottom: 16px;
`;

const TimeUnit = styled(TextField)`
	width: 60px;
	input {
		text-align: center;
		font-size: 1.5rem;
		font-weight: bold;
	}
`;

const Separator = styled(Typography)`
	margin: 0 16px;
`;

const AmPmButton = styled(Button)`
	&& {
		min-width: 60px;
	}
`;

const formatTime = (date: Date): string => {
	return date.toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit",
		hour12: true,
	});
};

const formatBackTime = (time: string): Date => {
	const date = new Date();
	const [hours, minutes] = time.split(":").map((num) => parseInt(num, 10));
	date.setHours(hours);
	date.setMinutes(minutes);
	return date;
};

interface BasicTimeRangePickerProps {
	startTime?: string;
	endTime?: string;
	setStartTime: (time: string) => void;
	setEndTime: (time: string) => void;
}

const BasicTimeRangePicker: React.FC<BasicTimeRangePickerProps> = ({
	startTime,
	endTime,
	setStartTime,
	setEndTime,
}) => {
	const [start, setStart] = useState<Date>(
		startTime ? formatBackTime(startTime) : new Date(),
	);
	const [end, setEnd] = useState<Date>(
		endTime ? formatBackTime(endTime) : new Date(),
	);
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const [currentPicker, setCurrentPicker] = useState<"start" | "end" | null>(
		null,
	);
	const [selectedUnit, setSelectedUnit] = useState<"hours" | "minutes">(
		"hours",
	);
	const hourInputRef = useRef<HTMLInputElement>(null);
	const minuteInputRef = useRef<HTMLInputElement>(null);

	const handleClick = (
		event: React.MouseEvent<HTMLElement>,
		picker: "start" | "end",
	) => {
		setAnchorEl(event.currentTarget);
		setCurrentPicker(picker);
	};

	const handleClose = () => {
		setAnchorEl(null);
		setCurrentPicker(null);
	};

	const handleTimeChange = (
		value: number,
		unit: "hours" | "minutes" = selectedUnit,
	) => {
		const newTime = new Date(currentPicker === "start" ? start : end);

		if (unit === "hours") {
			newTime.setHours(value);
		} else {
			newTime.setMinutes(value);
		}

		if (currentPicker === "start") {
			setStart(newTime);
			if (setStartTime) setStartTime(formatTime(newTime));
		} else {
			setEnd(newTime);
			if (setEndTime) setEndTime(formatTime(newTime));
		}
	};

	const toggleAmPm = () => {
		const currentTime = currentPicker === "start" ? start : end;
		const newTime = new Date(currentTime);
		newTime.setHours((newTime.getHours() + 12) % 24);

		if (currentPicker === "start") {
			setStart(newTime);
			if (setStartTime) setStartTime(formatTime(newTime));
		} else {
			setEnd(newTime);
			if (setEndTime) setEndTime(formatTime(newTime));
		}
	};

	const renderClockNumbers = () => {
		const numbers = selectedUnit === "hours" ? 12 : 60;
		const step = selectedUnit === "hours" ? 1 : 5;
		return Array.from({ length: numbers / step }, (_, i) => {
			const value = i * step + (selectedUnit === "hours" ? 1 : 0);
			const angle =
				((value / (selectedUnit === "hours" ? 12 : 60)) * 360 - 90) *
				(Math.PI / 180);
			const x = 85 + 70 * Math.cos(angle);
			const y = 85 + 70 * Math.sin(angle);
			return (
				<ClockNumber
					key={i}
					style={{ left: `${x}px`, top: `${y}px` }}
					onClick={() => handleTimeChange(value)}
				>
					{value}
				</ClockNumber>
			);
		});
	};

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		unit: "hours" | "minutes",
	) => {
		let value = parseInt(e.target.value, 10);
		if (isNaN(value)) return;

		if (unit === "hours") {
			value = value % 12;
			if (value === 0) value = 12;
		} else {
			value = value % 60;
		}

		handleTimeChange(value, unit);
	};

	const handleIncrement = (increment: number) => {
		const currentTime = currentPicker === "start" ? start : end;
		let value: number;
		if (selectedUnit === "hours") {
			value = (currentTime.getHours() + increment + 24) % 24;
		} else {
			value = (currentTime.getMinutes() + increment + 60) % 60;
		}
		handleTimeChange(value, selectedUnit);
	};

	const open = Boolean(anchorEl);
	const currentTime = currentPicker === "start" ? start : end;

	return (
		<Wrapper>
			<StyledTextField
				label="Start time"
				fullWidth
				value={startTime === "" ? "" : formatTime(start)}
				onClick={(e) => handleClick(e, "start")}
				InputProps={{
					startAdornment: <ClockIcon />,
					endAdornment: <ArrowDownIcon />,
					readOnly: true,
				}}
			/>
			<StyledTextField
				label="End time"
				fullWidth
				value={endTime === "" ? "" : formatTime(end)}
				onClick={(e) => handleClick(e, "end")}
				InputProps={{
					startAdornment: <ClockIcon />,
					endAdornment: <ArrowDownIcon />,
					readOnly: true,
				}}
			/>
			<TimePickerPopover
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "left",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "left",
				}}
			>
				<TimeControls>
					<IconButton onClick={() => handleIncrement(-1)}>
						-
					</IconButton>
					<TimeUnit
						inputRef={hourInputRef}
						value={(currentTime.getHours() % 12 || 12)
							.toString()
							.padStart(2, "0")}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							handleInputChange(e, "hours")
						}
						onFocus={() => setSelectedUnit("hours")}
						inputProps={{ min: 1, max: 12 }}
					/>
					<Separator variant="h4">:</Separator>
					<TimeUnit
						inputRef={minuteInputRef}
						value={currentTime
							.getMinutes()
							.toString()
							.padStart(2, "0")}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							handleInputChange(e, "minutes")
						}
						onFocus={() => setSelectedUnit("minutes")}
						inputProps={{ min: 0, max: 59 }}
					/>
					<IconButton onClick={() => handleIncrement(1)}>
						+
					</IconButton>
					<AmPmButton onClick={toggleAmPm}>
						{currentTime.getHours() >= 12 ? "PM" : "AM"}
					</AmPmButton>
				</TimeControls>
				<ClockFace>
					{renderClockNumbers()}
					<ClockHand
						style={{
							transform: `rotate(${((currentTime[selectedUnit === "hours" ? "getHours" : "getMinutes"]() % (selectedUnit === "hours" ? 12 : 60)) / (selectedUnit === "hours" ? 12 : 60)) * 360 - 180}deg)`,
						}}
					/>
				</ClockFace>
			</TimePickerPopover>
		</Wrapper>
	);
};

export default BasicTimeRangePicker;
