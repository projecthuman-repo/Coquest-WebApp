import React from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import styled from "@emotion/styled";
import InputAdornment from "@mui/material/InputAdornment";
import { useState } from "react";

export default function SearchBar() {
	const [input, setInput] = React.useState("");
	return (
		<div>
			<TextField
				InputProps={{
					sx: {
						borderRadius: 20,
						width: "100%",
						height: 56,
					},
					//puts search icon at the front of the bar
					startAdornment: (
						<InputAdornment position="start">
							<IconButton>
								<SearchIcon />
							</IconButton>
						</InputAdornment>
					),
				}}
				//styling for search bar
				className="inputRounded"
				placeholder="Search"
				variant="outlined"
				value={input}
				//uses on change to set input to target value
				onChange={(e) => setInput(e.target.value)}
			/>
		</div>
	);
}
