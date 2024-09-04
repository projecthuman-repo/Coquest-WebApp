import React, { useState, useEffect } from "react";
import { RadioGridRow } from "./RadioGridRow";
import { Grid, Typography } from "@mui/material";
import { styled } from "@mui/system";

const ContainerGrid = styled(Grid)({
	width: "100%",
	margin: "auto",
});

const GridRowWrapper = styled(Grid)({
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
});

const HeaderTitle = styled(Typography)({
	fontWeight: 500,
});
const HeaderSubtitle = styled(Typography)({
	fontSize: 14,
});

const AvailabilityGrid = () => {
	const [days, setDays] = useState<string[]>([]);

	useEffect(() => {
		setDays([
			"monday",
			"tuesday",
			"wednesday",
			"thursday",
			"friday",
			"saturday",
			"sunday",
		]);
	}, []);

	const [selectedValues, setSelectedValues] = useState<{
		[key: string]: string;
	}>({});

	const _handleTest = () => {
		console.log(
			"test running: current state--- " + selectedValues["monday"],
		);
	};
	const handleSelectedValueChange = (name: string, value: string) => {
		setSelectedValues({
			...selectedValues,
			[name]: value,
		});
	};
	return (
		<ContainerGrid container spacing={2}>
			<GridHeader />
			{days.map((day, index) => (
				<Grid item xs={20} key={index}>
					<RadioGridRow
						name={day}
						onChange={handleSelectedValueChange}
					/>
					<hr />
				</Grid>
			))}
			{/* <Button onClick={handleTest}>Tester</Button> */}
		</ContainerGrid>
	);
};

const GridHeader = () => {
	return (
		<Grid container spacing={2}>
			<GridRowWrapper item xs={3}>
				<HeaderTitle>Day</HeaderTitle>
			</GridRowWrapper>
			<GridRowWrapper item xs={3}>
				<HeaderTitle>Morning</HeaderTitle>
				<HeaderSubtitle>(8 am to 12 pm)</HeaderSubtitle>
			</GridRowWrapper>
			<GridRowWrapper item xs={3}>
				<HeaderTitle>Afternoon</HeaderTitle>
				<HeaderSubtitle>(12 pm to 5 pm)</HeaderSubtitle>
			</GridRowWrapper>
			<GridRowWrapper item xs={3}>
				<HeaderTitle>Evening</HeaderTitle>
				<HeaderSubtitle>(after 5 pm)</HeaderSubtitle>
			</GridRowWrapper>
		</Grid>
	);
};
export default AvailabilityGrid;
