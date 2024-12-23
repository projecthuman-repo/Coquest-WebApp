import React from "react";
import { useNavigate } from "react-router";
import { styled } from "@mui/system";
import { Grid, IconButton, Typography } from "@mui/material";
import LinearProgress, {
	linearProgressClasses,
} from "@mui/material/LinearProgress";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Project } from "../../../../models/projectModel";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
	height: 10,
	borderRadius: 5,
	width: "80%",
	marginBottom: 20,
	[`&.${linearProgressClasses.colorPrimary}`]: {
		backgroundColor:
			theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
	},
	[`& .${linearProgressClasses.bar}`]: {
		borderRadius: 5,
		backgroundColor: theme.palette.mode === "light" ? "#4ECB71" : "#308fe8",
	},
}));

interface ProjectProps {
	project: Project;
}
const Container = styled("div")(({ theme }) => ({
	width: "100%",
	padding: 30,
	[theme.breakpoints.down("sm")]: {
		width: "80%",
	},
}));

const Title = styled(Typography)({
	fontSize: 25,
	fontWeight: "525",
	marginBottom: 15,
});
const GridCol = styled(Grid)({
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
});
const ProjectPane = ({ project }: ProjectProps) => {
	const navigate = useNavigate();

	return (
		<Container>
			<Grid container spacing={2}>
				<Grid item xs={6} sm={7}>
					<Typography>{project?.location?.name}</Typography>
					<Title>{project.name}</Title>
					<Typography>{project.summary}</Typography>
				</Grid>
				<GridCol item xs={4} sm={4}>
					<Typography>Progress: {project.progress || 0}%</Typography>
					<BorderLinearProgress
						variant="determinate"
						value={project.progress ?? 0}
					/>
					<Typography>
						<strong>Recurring: </strong>
						{project.recurring || "(Not set yet)"}
					</Typography>
					<Typography>
						<strong>Start Date: </strong>
						{project.startDate || "(Not set yet)"}
					</Typography>
					<Typography>
						<strong>End Date: </strong>
						{project.endDate || "(Not set yet)"}
					</Typography>
					{/* <Typography>
						<strong>Spots open: </strong>
						{project.spots !== null ? project.spots : 0} seats left
					</Typography> */}
				</GridCol>
				<GridCol item xs={1}>
					<IconButton
						onClick={() => navigate(`/projects/${project._id}`)}
					>
						<ArrowForwardIosIcon />
					</IconButton>
				</GridCol>
			</Grid>
		</Container>
	);
};

export default ProjectPane;
