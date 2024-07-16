import React from "react";
import "./styles.css";
import { Divider, Typography } from "@mui/material";

type BallProps = {
	value: string;
	state?: boolean;
	type: 1 | 2 | 3 | 4;
	page: 1 | 2 | 3 | 4;
};

type ProgressBarProps = {
	page: 1 | 2 | 3 | 4;
};

const Ball = ({ value, page, type }: BallProps) => {
	return (
		<div
			className="BallStyles"
			style={{
				backgroundColor:
					page == type ? "rgb(82, 133, 236)" : "rgb(102, 102, 102)",
			}}
		>
			{value}
		</div>
	);
};

const ProgressBar = ({ page }: ProgressBarProps) => {
	return (
		<div
			className="ProgressBarContainer"
			style={{
				display: "flex",
				justifyContent: "center",
				padding: 30,
			}}
		>
			<Ball page={page} type={1} value={"1"} />
			<Typography variant="body2">Basic Information</Typography>
			<Divider style={{ width: "40px", backgroundColor: "black" }} />
			<Ball page={page} type={2} value={"2"} />
			<Typography variant="body2">Operations</Typography>
			<Divider style={{ width: "60px", backgroundColor: "black" }} />
			<Ball page={page} type={3} value={"3"} />
			<Typography variant="body2">Budgeting</Typography>
			<Divider style={{ width: "60px", backgroundColor: "black" }} />
			<Ball page={page} type={4} value={"4"} />
			<Typography variant="body2">Promotion</Typography>
		</div>
	);
};

export default ProgressBar;
