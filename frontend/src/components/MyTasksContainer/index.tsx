// MyTasksContainer/index.tsx
import React from "react";
import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import Link from "@mui/material/Link";
import TaskCard from "../../pages/Coop/CoopComponents/TaskCard";
import { TaskImpl, TaskStatus } from "../../models/taskModel"; // Import TaskImpl and TaskStatus

// Define component props
interface MyTasksContainerProps {
	label: string;
	seeAllLink: string;
}

// Sample task data
const taskContents: TaskImpl[] = [
	new TaskImpl({
		id: "1",
		taskName: "Task Review",
		communityName: "Legal Team",
		location: { lat: 34.0522, lng: -118.2437 },
		description: "Review all documents related to the upcoming case.",
		status: TaskStatus.PENDING,
		userID: "user123",
		questID: "quest001",
		requirements: ["Complete by EOD Friday"],
		completionStatus: false,
		history: ["Task created on 2023-05-10"],
		createdAt: new Date(),
		updatedAt: new Date()
	}),
	// Additional static tasks can be added here
];

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
	height: "88%",
	maxHeight: 638,
	paddingTop: 20,
});

const ContainerHeaderStyled = styled.div({
	display: "flex",
	justifyContent: "space-between",
});

const TasksListWrapperStyled = styled.div({
	padding: 10,
	paddingTop: 30,
	height: 538,
	overflow: "auto",
});

const TaskCardWrapperStyled = styled.div({
	marginBottom: "14px",
});

// Component function
const MyTasksContainer: React.FC<MyTasksContainerProps> = ({ label, seeAllLink }) => {
	return (
		<TasksContainerStyled>
			<ContainerHeaderStyled>
				<LabelStyled>{label}</LabelStyled>
				<SeeAllLinkStyled href={seeAllLink}>See all</SeeAllLinkStyled>
			</ContainerHeaderStyled>
			<TasksListWrapperStyled>
				{taskContents.map((task, index) => (
					<TaskCardWrapperStyled key={index}>
						<TaskCard
							name={task.taskName}
							community={task.communityName}
							location={`${task.location.lat}, ${task.location.lng}`}
							description={task.description}
							type="large"
						/>
					</TaskCardWrapperStyled>
				))}
			</TasksListWrapperStyled>
		</TasksContainerStyled>
	);
};

export default MyTasksContainer;
