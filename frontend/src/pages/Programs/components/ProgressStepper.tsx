import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

const steps = ["Basic Information", "Operations", "Budgeting", "Promotion"];

function ProgressStepper(props: { pgnum: number }) {
	const [activeStep, setActiveStep] = React.useState(props.pgnum);
	const [displayForSmallScreen, setDisplayForSmallScreen] =
		React.useState(true);

	const handleResize = () => {
		if (window.innerWidth < 700) {
			setDisplayForSmallScreen(true);
		} else {
			setDisplayForSmallScreen(false);
		}
	};

	useEffect(() => {
		setActiveStep(props.pgnum);

		handleResize();
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [props.pgnum]);

	return (
		<Box sx={{ maxWidth: "100%" }}>
			<Stepper activeStep={activeStep}>
				{steps.map((label, _index) => {
					const stepProps: { completed?: boolean } = {};
					return (
						<Step key={label} {...stepProps}>
							{/* Do not display labels for small screens */}
							<StepLabel>
								{displayForSmallScreen ? "" : label}
							</StepLabel>
						</Step>
					);
				})}
			</Stepper>
		</Box>
	);
}

export default ProgressStepper;
