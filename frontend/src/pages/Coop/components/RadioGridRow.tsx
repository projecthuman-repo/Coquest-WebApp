import React, { useState } from "react";
import { Checkbox, FormControlLabel, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { Grid } from "@mui/material";

const _Wrapper = styled("div")({
	width: "100%",
	display: "flex",
});

const GridRowWrapper = styled(Grid)({
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
});

const GridDayWrapper = styled(Grid)({
	display: "flex",
	alignItems: "center",
});

type RadioButtonGroupProps = {
	name: string;
	onChange: (name: string, value: string) => void;
};

export const RadioGridRow = ({ name, onChange }: RadioButtonGroupProps) => {
	const [selectedValue, setSelectedValue] = useState("");

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setSelectedValue(value);
		onChange(name, value);
	};

	const checkboxId = `${name}-${selectedValue}-checkbox`;
	const labelId = `${name}-${selectedValue}-label`;

	const capitalizeFirstLetter = (str: string) => {
		return str.charAt(0).toUpperCase() + str.slice(1);
	};

	return (
		<Grid container spacing={2}>
			<GridDayWrapper item xs={3}>
				<Typography>{capitalizeFirstLetter(name)}</Typography>
			</GridDayWrapper>
			<GridRowWrapper item xs={3}>
				<FormControlLabel
					control={
						<Checkbox
							id={checkboxId}
							checked={selectedValue === "option1"}
							onChange={handleChange}
							value="option1"
						/>
					}
					label={<label htmlFor={checkboxId} id={labelId}></label>}
				/>
			</GridRowWrapper>
			<GridRowWrapper item xs={3}>
				<FormControlLabel
					control={
						<Checkbox
							id={checkboxId}
							checked={selectedValue === "option2"}
							onChange={handleChange}
							value="option2"
						/>
					}
					label={<label htmlFor={checkboxId} id={labelId}></label>}
				/>
			</GridRowWrapper>
			<GridRowWrapper item xs={3}>
				<FormControlLabel
					control={
						<Checkbox
							id={checkboxId}
							checked={selectedValue === "option3"}
							onChange={handleChange}
							value="option3"
						/>
					}
					label={<label htmlFor={checkboxId} id={labelId}></label>}
				/>
			</GridRowWrapper>
		</Grid>
	);
};
