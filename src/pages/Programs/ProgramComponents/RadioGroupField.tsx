import { useState } from "react";
import {
	FormControl,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
	Typography,
} from "@mui/material";

export interface RadioOption {
	value: string;
	label: string;
}

export interface RadioGroupProps {
	label: string;
	name: string;
	options: RadioOption[];
	onChange: (value: string) => void;
}

export const RadioGroupField = ({
	label,
	name,
	options,
	onChange,
}: RadioGroupProps) => {
	const [value, setValue] = useState(options[0].value);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = (event.target as HTMLInputElement).value;
		setValue(newValue);
		onChange(newValue);
	};

	return (
		<FormControl component="fieldset" style={{ marginTop: 24 }}>
			<FormLabel component="legend">
				<Typography sx={{ color: "black" }}>{label}</Typography>
			</FormLabel>
			<RadioGroup
				aria-label={name}
				name={name}
				value={value}
				onChange={handleChange}
			>
				{options.map((option) => (
					<FormControlLabel
						key={option.value}
						value={option.value}
						control={<Radio color="default" />}
						label={option.label}
					/>
				))}
			</RadioGroup>
		</FormControl>
	);
};
