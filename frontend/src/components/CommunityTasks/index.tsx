import React from "react";
import styled from "@emotion/styled";
import { Typography, Grid } from "@mui/material";
import TaskCard from "../../pages/Coop/CoopComponents/TaskCard";
import { TaskImpl, TaskStatus } from "../../models/taskModel"; // assuming you have TaskStatus correctly defined

const Header = styled(Typography)({
	fontWeight: 600,
	paddingTop: 30,
	paddingLeft: 30,
	fontSize: "18px",  // Increased from 16px to 18px
	lineHeight: "28px",  // Adjusted line height for better readability
	color: "#000000",
});

const CommunityContainer = styled.div({
	backgroundColor: "#D9D9D9",
	borderRadius: 10,
	width: "95%",
	height: 329,
	margin: "auto",
});

const CustomGrid = styled(Grid)({
	width: "100%",
	height: 250,
	overflow: "auto",
	margin: "auto",
	padding: 15,
	paddingTop: 0,
});

const TaskCardWrapper = styled.div({
	marginBottom: "14px", // Add margin to each task card for better spacing
});

// Create TaskImpl instances
const taskContents = [
	new TaskImpl({
		id: undefined,
		taskName: "Task Name",
		communityName: "Community name",
		location: { lat: 34.0522, lng: -118.2437 }, // Correct spelling and use object
		description: "Description. Lorem ipsum dolor sit amet consectetur. Nisl sollicitudin aliquam quam.",
		status: TaskStatus.PENDING
	}),
	// Repeat for other tasks as needed
];

const CommunityTasks = () => {
	return (
		<CommunityContainer>
			<Header>All community tasks</Header>
			<CustomGrid container spacing={1}>
				{taskContents.map((task, index) => (
					<Grid item key={index} lg={4}>
						<TaskCardWrapper>
							<TaskCard
								name={task.taskName}
								community={task.communityName}
								location={`${task.location.lat}, ${task.location.lng}`} // Adjust how location is displayed
								description={task.description}
								type="small"
							/>
						</TaskCardWrapper>
					</Grid>
				))}
			</CustomGrid>
		</CommunityContainer>
	);
};

export default CommunityTasks;
