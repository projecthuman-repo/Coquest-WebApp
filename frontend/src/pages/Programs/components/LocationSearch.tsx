import React, { useState } from "react";
import { TextField } from "@mui/material";
import { styled } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";

const SearchBarContainer = styled("div")({
	display: "flex",
	flexDirection: "column",
	marginTop: 5,
	"& button:hover": {
		backgroundColor: "#DDDDDD",
	},
});

const SearchIconComp = styled(SearchIcon)({
	color: "#666666",
	marginRight: "19.5px",
});
type StyledTextFieldProps = {
	label: string;
	placeholder: string;
};

const StyledTextField = styled(TextField)<StyledTextFieldProps>`
	&& {
		margin-top: 28px;
		.MuiInputLabel-shrink {
			color: black;
		}
		& .placeholder-mod::placeholder {
			color: #a1a1a1;
		}
	}
`;

const LocationSearch = () => {
	const [searchValue, setSearchValue] = useState("");

	const handleSearchInputChange = (event: any) => {
		setSearchValue(event.target.value);
	};

	return (
		<SearchBarContainer>
			<StyledTextField
				label="Location"
				fullWidth
				placeholder="Search for location"
				value={searchValue}
				onChange={handleSearchInputChange}
				InputLabelProps={{
					shrink: true,
				}}
				InputProps={{
					startAdornment: <SearchIconComp />,
				}}
			/>
		</SearchBarContainer>
	);
};

export default LocationSearch;
