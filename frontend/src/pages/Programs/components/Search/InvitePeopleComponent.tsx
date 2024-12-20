import React from "react";
import TagSearch, { TagSearchProps } from "./TagSearch";
import { styled } from "@mui/system";

const SearchBarContainer = styled("div")({
	display: "flex",
	flexDirection: "column",
	marginTop: 31,
});

const SearchInputContainer = styled("div")({
	height: 50,
	display: "flex",
	alignItems: "center",
	border: "1px solid grey",
	borderRadius: 4,
	overflow: "hidden",
	"::-webkit-scrollbar": {
		display: "none",
	},
});

export interface UsernameSearchProps
	extends Omit<TagSearchProps, "tags" | "onChange"> {
	usernames: string[];
	onChange: (selectedUsernames: string[]) => void;
}

const InvitePeopleComponent: React.FC<UsernameSearchProps> = (props) => {
	const { usernames, onChange, ...rest } = props;

	const handleChange = (selectedTags: string[]) => {
		onChange(selectedTags);
	};

	return (
		<SearchBarContainer>
			<TagSearch
				{...rest}
				tags={usernames}
				placeholder="Input usernames"
				onChange={handleChange}
				SearchInputContainer={SearchInputContainer}
			/>
		</SearchBarContainer>
	);
};

export default InvitePeopleComponent;
