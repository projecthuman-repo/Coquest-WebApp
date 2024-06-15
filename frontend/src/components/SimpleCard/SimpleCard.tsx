import { Typography } from "@mui/material";
import React from "react";
import styled from "@emotion/styled";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import IconButton from "@mui/material/IconButton";

//uses props to take card label
type SimpleCardProps = {
	label: string;
};

const Label = styled(Typography)({
	fontWeight: 600,
	fontSize: "14px",
	color: "#000000",
});

const CardContainer = styled.div({
	backgroundColor: "#F3F3F3",
	borderRadius: "10px",
	display: "flex",
	justifyContent: "space-between",
	padding: 20,
	paddingTop: 10,
	paddingBottom: 10,
	alignItems: "center",
	boxShadow: "0 4px 10px 0 rgba(0, 0, 0, 0.25)",
});
//places icon button
const ChevronIcon = styled(ChevronRightIcon)({
	color: "#666666",
});

//places all the elements inside the card
const SimpleCard = ({ label }: SimpleCardProps) => {
	return (
		<CardContainer>
			<Label>{label}</Label>
			<IconButton>
				<ChevronIcon />
			</IconButton>
		</CardContainer>
	);
};

export default SimpleCard;
