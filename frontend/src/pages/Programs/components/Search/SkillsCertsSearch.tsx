import React from "react";
import { styled } from "@mui/system";
import DoneIcon from "@mui/icons-material/Done";
import TagSearch, { TagSearchProps } from "./TagSearch";

const CheckMark = styled(DoneIcon)({
	marginRight: 8,
});

const SkillButton = styled("div")({
	backgroundColor: "#F0F0F0",
	borderRadius: 8,
	display: "flex",
	flexWrap: "nowrap",
	whiteSpace: "nowrap",
	alignItems: "center",
	margin: 5,
	padding: "5px 10px",
	cursor: "pointer",
});

export interface SkillSearchProps
	extends Omit<TagSearchProps, "tags" | "onChange"> {
	label: string;
	skills: string[];
	onChange: (selectedSkills: string[]) => void;
}

const SkillsCertsSearch = (props: SkillSearchProps) => {
	const { skills, label, onChange, ...rest } = props;

	const handleChange = (selectedSkillNames: string[]) => {
		const selectedSkills = skills.filter((skill) =>
			selectedSkillNames.includes(skill),
		);
		onChange(selectedSkills);
	};

	return (
		<TagSearch
			{...rest}
			tags={skills.filter((skill) => skill !== "")}
			TagButtonComponent={({ children, ...buttonProps }) => (
				<SkillButton {...buttonProps}>
					<CheckMark />
					{children}
				</SkillButton>
			)}
			SelectedTagButtonComponent={({ children, ...buttonProps }) => (
				<SkillButton {...buttonProps}>
					<CheckMark />
					{children}
				</SkillButton>
			)}
			placeholder={label}
			onChange={handleChange}
		/>
	);
};

export default SkillsCertsSearch;
