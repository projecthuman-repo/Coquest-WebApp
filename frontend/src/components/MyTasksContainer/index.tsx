import React from "react";
import styled from "@emotion/styled";
import { Typography, Button } from "@mui/material";
import Link from "@mui/material/Link";

// Define component props
interface MyTasksContainerProps {
	label: string;
	seeAllLink: string;
}

// Styled components for UI
const SeeAllLinkStyled = styled(Link)({
	fontWeight: 400,
	fontSize: "13px",
	color: "#000000",
});

const LabelStyled = styled(Typography)({
	fontWeight: 600,
	fontSize: 16,
	color: "#000000",
	lineHeight: "24px",
});

const TasksContainerStyled = styled.div({
	backgroundColor: "#F3F3F3",
	borderRadius: "10px",
	padding: 30,
	height: "86.4%",
	maxHeight: 638,
	display: "flex",
	flexDirection: "column",
});

const ContainerHeaderStyled = styled.div({
	display: "flex",
	justifyContent: "space-between",
	marginBottom: 20, // Add some margin below the header if needed
});

const ContentCentered = styled.div({
	flexGrow: 1,
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
});

const NoTasksText = styled(Typography)({
	fontWeight: 500,
	fontSize: 16,
	color: "#000000",
	marginBottom: 20,
});

const FindTasksButton = styled(Button)({
	backgroundColor: "#FFFFFF",
	color: "#000000",
	'&:hover': {
		backgroundColor: "#e0e0e0",
	},
	padding: "10px 20px",
	borderRadius: "40px"
});

// Component function
const MyTasksContainer: React.FC<MyTasksContainerProps> = ({ label, seeAllLink }) => {
	return (
		<TasksContainerStyled>
			<ContainerHeaderStyled>
				<LabelStyled>{label}</LabelStyled>
				<SeeAllLinkStyled href={seeAllLink}>See all</SeeAllLinkStyled>
			</ContainerHeaderStyled>
			<ContentCentered>
				<NoTasksText>You have no tasks yet</NoTasksText>
				<FindTasksButton variant="contained">
					Find Available Tasks
				</FindTasksButton>
			</ContentCentered>
		</TasksContainerStyled>
	);
};

export default MyTasksContainer;
