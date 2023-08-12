import React, { useState } from "react";
import { InputBase, Button } from "@mui/material";
import { styled } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import DoneIcon from "@mui/icons-material/Done";
import { getValue } from "@testing-library/user-event/dist/utils";

const CheckMark = styled(DoneIcon)({
	marginRight: 13,
});
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
	borderRadius: 28,
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

const SkillsCertsContainer = styled("div")({
	display: "flexWrap",
	height: 43,
	overflowY: "scroll",
	marginTop: 10,
	"::-webkit-scrollbar": {
		display: "none",
	},
});

const HashtagButton = styled(Button)({
	margin: 5,
	backgroundColor: "#F0F0F0",
	borderRadius: 8,
	color: "black",
	textTransform: "none",
});

const SelectedSkillButton = styled(Button)({
	margin: 5,
	marginLeft: 5,
	backgroundColor: "#F0F0F0",
	borderRadius: 8,
	color: "black",
	textTransform: "none",
});

export interface SkillSearchProps {
	skills: string[];
}
export type HandleSkillType = (skill: string) => void;

const SkillsCertsSearch = (props: SkillSearchProps) => {
	const [searchValue, setSearchValue] = useState("");
	const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

	const handleSearchInputChange = (event: any) => {
		setSearchValue(event.target.value);
	};

	const handleHashtagClick: HandleSkillType = (skill) => {
		if (!selectedSkills.includes(skill)) {
			setSelectedSkills([...selectedSkills, skill]);
		}
	};

	const handleSelectedSkillClick: HandleSkillType = (skill) => {
		setSelectedSkills(
			selectedSkills.filter((selectedSkill) => selectedSkill !== skill)
		);
	};

	const renderSkillButtons = () => {
		return props.skills
			.filter(
				(skill) =>
					skill.toLowerCase().includes(searchValue) &&
					!selectedSkills.includes(skill)
			)
			.map((skill) => (
				<HashtagButton
					key={skill}
					variant="contained"
					onClick={() => {
						handleHashtagClick(skill);
						setSearchValue("");
					}}
				>
					<CheckMark />
					{skill}
				</HashtagButton>
			));
	};

	const renderSkills = () => {
		return (
			<div style={{ display: "flex", flexDirection: "row-reverse" }}>
				{selectedSkills.map((skill) => (
					<SelectedSkillButton
						key={skill}
						variant="contained"
						onClick={() => handleSelectedSkillClick(skill)}
					>
						<CheckMark />
						{skill}
						<span>&nbsp;&times;</span>
					</SelectedSkillButton>
				))}
			</div>
		);
	};

	return (
		<SearchBarContainer>
			<SearchInputContainer>
				<InputBase
					placeholder="Search skills and certifications"
					className="placeholder-mod"
					style={{ width: "90%" }}
					value={searchValue}
					onChange={handleSearchInputChange}
					inputProps={{ "aria-label": "search" }}
				/>
				<div>{renderSkills()}</div>
				<SearchIconWrapper>
					<SearchIcon />
				</SearchIconWrapper>
			</SearchInputContainer>

			<SkillsCertsContainer>{renderSkillButtons()}</SkillsCertsContainer>
		</SearchBarContainer>
	);
};

export default SkillsCertsSearch;
