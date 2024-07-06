import { Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import IconButton from "@mui/material/IconButton";

//uses props to take card label
type SimpleCardProps = {
	label: string;
	link?: string;
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
	flexDirection: "column",
	justifyContent: "space-between",
	padding: 20,
	paddingTop: 10,
	paddingBottom: 10,
	alignItems: "center",
});
//places icon button
const ChevronIcon = styled(ChevronRightIcon)({
	color: "#666666",
});
const Header = styled("div")({
	width: "100%",
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
});

const Blank = styled("div")({
	backgroundColor: "#666666",
	height: 100,
	width: "33%",
	margin: 5,
	borderRadius: 5,
});
const PostContainer = styled("div")({
	width: "100%",
	justifyContent: "around",
	padding: 10,
});

const BlankContainer = styled("div")({
	width: "100%",
	display: "flex",
});
const _posts = ["Post1", "Post2", "Post3", "Post4", "Post5", "Post6"];

//places all the elements inside the card
const ExtendedSimpleCard = ({ label, link }: SimpleCardProps) => {
	const navigate = useNavigate();

	return (
		<CardContainer>
			<Header>
				<Label>{label}</Label>
				<IconButton onClick={() => navigate(link || "")}>
					<ChevronIcon />
				</IconButton>
			</Header>
			<PostContainer>
				<BlankContainer>
					<Blank></Blank>
					<Blank></Blank>
					<Blank></Blank>
				</BlankContainer>
				<BlankContainer>
					<Blank></Blank>
					<Blank></Blank>
					<Blank></Blank>
				</BlankContainer>
				<BlankContainer>
					<Blank></Blank>
					<Blank></Blank>
					<Blank></Blank>
				</BlankContainer>
			</PostContainer>
		</CardContainer>
	);
};

export default ExtendedSimpleCard;
