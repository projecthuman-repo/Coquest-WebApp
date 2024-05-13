import React from "react";
import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import Link from "@mui/material/Link";
import TaskCard from "../../pages/Coop/CoopComponents/TaskCard";
import { TaskImpl, TaskStatus } from "../../models/taskModel"; // Make sure to import TaskImpl and TaskStatus

// props for task label and link to task page
interface MyTasksContainerProps {
	label: string;
	seeAllLink: string;
}

// Example tasks matching the Task model
const taskContents: TaskImpl[] = [
	new TaskImpl({
		id: undefined,
		taskName: "Task Name",
		communityName: "Community name",
		location: { lat: 34.0522, lng: -118.2437 },
		description: "Description. Lorem ipsum dolor sit amet consectetur. Nisl sollicitudin aliquam quam.",
		status: TaskStatus.PENDING
	}),
	// Additional tasks can be added here
];

const SeeAllLink = styled(Link)({
	fontWeight: 400,
	fontSize: "13px",
	color: "#000000",
});

const Label = styled(Typography)({
	fontWeight: 600,
	fontSize: 16,
	color: "#000000",
	lineHeight: "24px",
});

const TasksContainer = styled.div({
	backgroundColor: "#F3F3F3",
	borderRadius: "10px",
	padding: 30,
	height: "88%",
	maxHeight: 638,
	paddingTop: 20,
});

const ContainerHeader = styled.div({
	display: "flex",
	justifyContent: "space-between",
});

const TasksListWrapper = styled.div({
	padding: 10,
	paddingTop: 30,
	height: 538,
	overflow: "auto",
});

const TaskCardWrapper = styled.div({
	marginBottom: "14px",
});

// Maps through data to display on each task card
// Places the link in upper right hand corner
const MyTasksContainer: React.FC<MyTasksContainerProps> = ({ label, seeAllLink }) => {
	return (
		<TasksContainer>
			<ContainerHeader>
				<Label>{label}</Label>
				<SeeAllLink href={seeAllLink} color="#000000">
					See all
				</SeeAllLink>
			</ContainerHeader>
			<TasksListWrapper>
				{taskContents.map((task, index) => (
					<TaskCardWrapper key={index}>
						<TaskCard
							name={task.taskName}
							community={task.communityName}
							location={`${task.location.lat}, ${task.location.lng}`}
							description={task.description}
							type="large"
						/>
					</TaskCardWrapper>
				))}
			</TasksListWrapper>
		</TasksContainer>
	);
};

export default MyTasksContainer;
