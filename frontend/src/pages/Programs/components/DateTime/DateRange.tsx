import React, { useState } from "react";
import styled from "@emotion/styled";
import DateComponent from "./DateComponent";

const Wrapper = styled.div`
	display: flex;
	gap: 1rem;

	@media (max-width: 700px) {
		flex-direction: column;
	}
`;

type BasicDateRangePickerProps = {
	startDate?: Date | null;
	endDate?: Date | null;
	setStartDate?: (date: Date | null) => void;
	setEndDate?: (date: Date | null) => void;
};

const BasicDateRangePicker: React.FC<BasicDateRangePickerProps> = ({
	startDate,
	endDate,
	setStartDate,
	setEndDate,
}) => {
	const [start, setStart] = useState<Date | null>(startDate || null);
	const [end, setEnd] = useState<Date | null>(endDate || null);

	const handleStartDateChange = (date: Date | null) => {
		setStart(date);
		if (setStartDate) setStartDate(date);
	};

	const handleEndDateChange = (date: Date | null) => {
		setEnd(date);
		if (setEndDate) setEndDate(date);
	};

	return (
		<Wrapper>
			<DateComponent
				label="Start date"
				value={start}
				onChange={handleStartDateChange}
				maxDate={end === null ? undefined : end}
			/>
			<DateComponent
				label="End date"
				value={end}
				onChange={handleEndDateChange}
				minDate={start === null ? undefined : start}
			/>
		</Wrapper>
	);
};

export default BasicDateRangePicker;
