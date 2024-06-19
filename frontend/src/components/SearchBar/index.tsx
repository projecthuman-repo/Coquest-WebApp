import React from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";

export default function SearchBar() {
	const [input, setInput] = React.useState("");

	return (
		<div>
			<TextField
				InputProps={{
					sx: {
						borderRadius: 20,
						width: "100%", // Adjusted width
						height: 44, // Adjusted height
					},
					// Puts search icon at the front of the bar
					startAdornment: (
						<InputAdornment position="start">
							<IconButton>
								<SearchIcon />
							</IconButton>
						</InputAdornment>
					),
				}}
				// Styling for search bar
				className="inputRounded"
				placeholder="Search"
				variant="outlined"
				value={input}
				// Uses on change to set input to target value
				onChange={(e) => setInput(e.target.value)}
			/>
		</div>
	);
}
