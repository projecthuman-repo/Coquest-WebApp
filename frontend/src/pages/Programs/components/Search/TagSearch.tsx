import React, { useState, useEffect } from "react";
import { InputBase } from "@mui/material";
import { styled } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";

const SearchBarContainer = styled("div")({
	display: "flex",
	flexDirection: "column",
	"& button:hover": {
		backgroundColor: "#DDDDDD",
	},
});

const SearchInputContainer = styled("div")({
	height: 50,
	display: "flex",
	alignItems: "center",
	border: "1px solid grey",
	borderRadius: 28,
	overflow: "hidden",
	"::-webkit-scrollbar": {
		display: "none",
	},
});

const SearchIconWrapper = styled("div")({
	margin: 8,
	fontSize: 12,
	color: "grey",
	display: "flex",
	alignItems: "center",
});

const SearchInput = styled("div")({
	height: "100%",
	width: "100%",
	padding: "0 10px",
	display: "flex",
	alignItems: "center",
	overflowX: "scroll",
	overflowY: "hidden",
	"::-webkit-scrollbar": {
		height: 3,
	},
	"::-webkit-scrollbar-thumb": {
		backgroundColor: "#a1a1a1",
		borderRadius: 10,
	},
});

const TagContainer = styled("div")({
	display: "flex",
	flexWrap: "wrap",
	gap: 10,
	flexDirection: "row",
	height: 43,
	overflowY: "scroll",
	marginTop: 10,
	"::-webkit-scrollbar": {
		display: "none",
	},
});

const TagButton = styled("div")({
	margin: 5,
	fontSize: 14,
	width: "fit-content",
	borderRadius: 8,
	color: "black",
	textTransform: "none",
	"&:hover": {
		cursor: "pointer",
	},
});

const SelectedTagButton = styled("div")({
	margin: 5,
	fontSize: 14,
	borderRadius: 8,
	color: "black",
	textTransform: "none",
	"&:hover": {
		cursor: "pointer",
	},
});

export interface TagSearchProps {
	tags: string[];
	TagButtonComponent?: React.ComponentType<any>;
	SelectedTagButtonComponent?: React.ComponentType<any>;
	SearchInputContainer?: React.ComponentType<any>;
	placeholder?: string;
	onChange: (selectedTags: string[]) => void;
}

export type HandleTagType = (tag: string) => void;

const TagSearch = (props: TagSearchProps) => {
	const [searchValue, setSearchValue] = useState("");
	const [selectedTags, setSelectedTags] = useState<string[]>([]);
	const SearchInputContainerComponent =
		props.SearchInputContainer || SearchInputContainer;

	const handleSearchInputChange = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		setSearchValue(event.target.value);
	};

	const handleTagClick: HandleTagType = (tag) => {
		if (!selectedTags.includes(tag)) {
			setSelectedTags([...selectedTags, tag]);
		}
	};

	const handleSelectedTagClick: HandleTagType = (tag) => {
		setSelectedTags(
			selectedTags.filter((selectedTag) => selectedTag !== tag),
		);
	};

	useEffect(() => {
		if (props.onChange) {
			props.onChange(selectedTags);
		}
	}, [selectedTags, props.onChange]);

	const renderTagButtons = () => {
		const TagButtonComponent = props.TagButtonComponent || TagButton;
		return props.tags
			.filter(
				(tag) =>
					tag.toLowerCase().includes(searchValue.toLowerCase()) &&
					!selectedTags.includes(tag),
			)
			.map((tag) => (
				<TagButtonComponent
					key={tag}
					onClick={() => {
						setSearchValue("");
						handleTagClick(tag);
					}}
				>
					{tag}
				</TagButtonComponent>
			));
	};

	const renderSelectedTags = () => {
		const SelectedTagButtonComponent =
			props.SelectedTagButtonComponent || SelectedTagButton;
		return (
			<div style={{ display: "flex", flexDirection: "row-reverse" }}>
				{selectedTags.map((tag) => (
					<SelectedTagButtonComponent
						key={tag}
						onClick={() => handleSelectedTagClick(tag)}
					>
						{tag}
						<span>&nbsp;&times;</span>
					</SelectedTagButtonComponent>
				))}
			</div>
		);
	};

	return (
		<SearchBarContainer>
			<SearchInputContainerComponent>
				<SearchInput>
					<SearchIconWrapper>
						<SearchIcon />
					</SearchIconWrapper>
					<InputBase
						placeholder={props.placeholder || "Search tags"}
						className="placeholder-mod"
						style={{ width: "90%", minWidth: 150 }}
						value={searchValue}
						onChange={handleSearchInputChange}
						inputProps={{ "aria-label": "search" }}
					/>
					<div>{renderSelectedTags()}</div>
				</SearchInput>
			</SearchInputContainerComponent>

			<TagContainer>{renderTagButtons()}</TagContainer>
		</SearchBarContainer>
	);
};

export default TagSearch;
