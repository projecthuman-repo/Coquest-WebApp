import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import styled from "@emotion/styled";

type TaskCardProps = {
	name: string;
	community: string;
	location: string;
	description: string;
	type: "small" | "large";
};

const Name = styled(Typography)({
	fontWeight: 600,
	fontSize: 16, // More readable font size for the name
	color: "black",
	lineHeight: "24px",
});

const Body = styled(Typography)({
	fontWeight: 400,
	fontSize: 12, // More readable font size for the body text
	lineHeight: "18px",
});

const ChevronIcon = styled(ChevronRightIcon)({
	color: "black",
	fontSize: 24, // Slightly larger icon size for better interaction
});

const TaskCard = ({
	name,
	community,
	location,
	description,
	type,
	...rest
}: TaskCardProps) => {
	const CustomCard = styled(Card)({
		height: type === "large" ? 148 : 164,
		width: type === "large" ? 234 : 234,
	});

	return (
		<CustomCard {...rest}>
			<CardHeader
				action={
					<IconButton>
						<ChevronIcon />
					</IconButton>
				}
				title={<Name>{name}</Name>}
				subheader={
					<>
						<Body>{community} <br /> {location}</Body>
						<Body>{description}</Body>
					</>
				}
			/>
		</CustomCard>
	);
};

export default TaskCard;
