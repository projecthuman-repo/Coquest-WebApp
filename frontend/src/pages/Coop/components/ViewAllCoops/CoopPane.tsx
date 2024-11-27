import React from "react";
import { useNavigate } from "react-router";
import { styled } from "@mui/system";
import { Grid, IconButton, Typography } from "@mui/material";
import LinearProgress, {
	linearProgressClasses,
} from "@mui/material/LinearProgress";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
//import { Program } from "../../../../models/programModel";
import { Coop } from "../../../../models/coopModel";

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

interface CoopProps {
	coop: Coop;
	// expanded: boolean;
	// onToggleExpand: () => void;
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
const CoopPane = (props: CoopProps) => {
	const { coop } = props;

	const navigate = useNavigate();

	return (
		<Container>
			<Grid container spacing={2}>
				<Grid item xs={6} sm={7}>
					<Typography>
						{coop.location !== null && coop.location !== ""
							? coop.location
							: "(Not set yet)"}
					</Typography>
					<Title>{coop.name}</Title>
					<Typography>{coop.description}</Typography>
				</Grid>
				<GridCol item xs={4} sm={4}>
					<Typography>
						Progress: {coop.progress !== null ? coop.progress : 0}%
					</Typography>

					<BorderLinearProgress
						variant="determinate"
						value={coop.progress !== null ? coop.progress : 0}
					/>

					<Typography>
						<strong>Time: </strong>
						{coop.time !== null && coop.time !== ""
							? coop.time
							: "(Not set yet)"}
					</Typography>
					<Typography>
						<strong>Date: </strong>
						{coop.date !== null && coop.date !== ""
							? coop.date
							: "(Not set yet)"}
					</Typography>
					<Typography>
						<strong>Spots open: </strong>
						{coop.spots !== null ? coop.spots : 0} seats left
					</Typography>
				</GridCol>
				<GridCol item xs={1}>
					<IconButton
						onClick={() => navigate(`/coops/${coop._id}`)}
					>
						<ArrowForwardIosIcon />
					</IconButton>
				</GridCol>
			</Grid>
		</Container>
	);
};

export default CoopPane;
