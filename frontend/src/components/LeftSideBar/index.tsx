import React from "react";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MapIcon from "@mui/icons-material/Map";
import styled from "@emotion/styled";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import GroupsIcon from "@mui/icons-material/Groups";
import { useNavigate } from "react-router-dom";

const LeftToolBar = styled.div({
	float: "left",
	width: "80px",
	height: "calc(100vh - 64px)",
	alignItems: "flex-start",
	flexDirection: "row",
	display: "flex",
	borderRight: "1px solid rgb(209, 209, 209)",
	borderBottom: "1px solid rgb(209, 209, 209)",
});

const IconContainer = styled.div({
	width: "56px",
	height: "216px",
	marginLeft: "12px",
	marginTop: "21px",
	padding: "0px",
});

const Icon = styled(IconButton)({
	gap: "3px",
	alignItems: "center",
	flexDirection: "column",
	display: "flex",
	width: "56px",
	height: "45px",
	borderRadius: "0px",
	marginBottom: "12px",
});

const Text = styled(Typography)({
	fontFamily: "Poppins",
	fontSize: "12px",
	lineHeight: "18px",
	fontWeight: 500,
	color: "#000000",
});

const Toolbar = () => {
	const navigate = useNavigate();

	const handleHomeClick = () => {
		console.log("Home icon clicked");
		navigate("/");
		window.location.reload(); // Temporary fix to ensure the page loads
	};

	return (
		<LeftToolBar>
			<IconContainer>
				<Icon onClick={handleHomeClick}>
					<DashboardIcon />
					<Text>Home</Text>
				</Icon>
				<Icon>
					<MapIcon />
					<Text>Map</Text>
				</Icon>
				<Icon>
					<AssignmentTurnedInIcon />
					<Text>Quests</Text>
				</Icon>
				<Icon>
					<GroupsIcon />
					<Text>Groups</Text>
				</Icon>
			</IconContainer>
		</LeftToolBar>
	);
};

export default Toolbar;
