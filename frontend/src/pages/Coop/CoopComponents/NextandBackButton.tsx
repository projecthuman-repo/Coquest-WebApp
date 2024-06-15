import styled from "@emotion/styled";
import { Button, ButtonProps } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

type CustomButtonProps = ButtonProps & {
	next: string;
	back: string;
};

const NextandBackButton = ({ next, back }: CustomButtonProps) => {
	const Container = styled.div({
		display: "flex",
		justifyContent: "end",
		gap: 30,
		marginRight: 70,
	});
	return (
		<Container>
			<Button
				component={Link}
				to={back}
				style={{
					color: "black",
					fontWeight: 500,
					textTransform: "none",
					fontSize: 16,
					borderRadius: 30,
					width: 80,
				}}
			>
				{"<"} Back
			</Button>
			<Button
				variant="contained"
				disableElevation
				component={Link}
				to={next}
				style={{
					backgroundColor: "rgb(217, 217, 217)",
					color: "black",
					fontWeight: 500,
					textTransform: "none",
					fontSize: 16,
					borderRadius: 30,
					width: 80,
				}}
			>
				Next
			</Button>
		</Container>
	);
};

export default NextandBackButton;
