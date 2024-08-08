import React, { useState } from "react";
import { InputBase, Button } from "@mui/material";
import { styled } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";

const SearchBarContainer = styled("div")({
	display: "flex",
	flexDirection: "column",
	marginTop: 31,
	"& button:hover": {
		backgroundColor: "#DDDDDD",
	},
});

const SearchInputContainer = styled("div")({
	display: "flex",
	flexDirection: "row-reverse",
	alignItems: "center",
	border: "1px solid black",
	borderRadius: 6,
	overflow: "scroll",
	"::-webkit-scrollbar": {
		display: "none",
	},
});

const SearchIconWrapper = styled("div")({
	margin: 8,
	fontSize: 12,
	color: "#666666",
});

const UsernamesContainer = styled("div")({
	display: "flexWrap",
	height: 43,
	overflowY: "scroll",
	marginTop: 10,
	"::-webkit-scrollbar": {
		display: "none",
	},
});

const UsernameButton = styled(Button)({
	margin: 5,
	backgroundColor: "#F0F0F0",
	borderRadius: 8,
	color: "black",
	textTransform: "none",
});

const SelectedUsernameButton = styled(Button)({
	margin: 5,
	marginLeft: 5,
	backgroundColor: "#F0F0F0",
	borderRadius: 8,
	color: "black",
	textTransform: "none",
});

export interface UsernameSearchProps {
	usernames: string[];
}
export type HandleUsernameType = (username: string) => void;

const InvitePeopleComponent = (props: UsernameSearchProps) => {
	const [searchValue, setSearchValue] = useState("");
	const [selectedUsernames, setSelectedUsernames] = useState<string[]>([]);

	const handleSearchInputChange = (event: any) => {
		setSearchValue(event.target.value);
	};

	const handleUsernameClick: HandleUsernameType = (username) => {
		if (!selectedUsernames.includes(username)) {
			setSelectedUsernames([...selectedUsernames, username]);
		}
	};
	const handleSelectedUsernameClick: HandleUsernameType = (username) => {
		setSelectedUsernames(
			selectedUsernames.filter(
				(selectedUsername) => selectedUsername !== username,
			),
		);
	};

	const renderUsernameButtons = () => {
		return props.usernames
			.filter(
				(username) =>
					username.toLowerCase().includes(searchValue) &&
					!selectedUsernames.includes(username),
			)
			.map((username) => (
				<UsernameButton
					key={username}
					variant="contained"
					onClick={() => {
						handleUsernameClick(username);
						setSearchValue("");
					}}
				>
					{username}
				</UsernameButton>
			));
	};

	const renderUsernames = () => {
		return (
			<div style={{ display: "flex", flexDirection: "row-reverse" }}>
				{selectedUsernames.map((username) => (
					<SelectedUsernameButton
						key={username}
						variant="contained"
						onClick={() => handleSelectedUsernameClick(username)}
					>
						{username}
						<span>&nbsp;&times;</span>
					</SelectedUsernameButton>
				))}
			</div>
		);
	};

	return (
		<SearchBarContainer>
			<SearchInputContainer>
				<InputBase
					placeholder="Input "
					className="placeholder-mod"
					style={{ width: "90%" }}
					value={searchValue}
					onChange={handleSearchInputChange}
					inputProps={{ "aria-label": "search" }}
				/>
				<div>{renderUsernames()}</div>
				<SearchIconWrapper>
					<SearchIcon />
				</SearchIconWrapper>
			</SearchInputContainer>

			<UsernamesContainer>{renderUsernameButtons()}</UsernamesContainer>
		</SearchBarContainer>
	);
};

export default InvitePeopleComponent;
