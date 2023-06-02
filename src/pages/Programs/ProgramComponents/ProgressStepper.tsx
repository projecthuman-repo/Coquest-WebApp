import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

const steps = ["Basic Information", "Operations", "Budgeting", "Promotion"];

function ProgressStepper(props: { pgnum: number }) {
	const [activeStep, setActiveStep] = React.useState(props.pgnum);

	useEffect(() => {
		setActiveStep(props.pgnum);
	}, [props.pgnum]);

	return (
		<Box sx={{ width: "100%" }}>
			<Stepper activeStep={activeStep}>
				{steps.map((label, index) => {
					const stepProps: { completed?: boolean } = {};
					return (
						<Step key={label} {...stepProps}>
							<StepLabel>{label}</StepLabel>
						</Step>
					);
				})}
			</Stepper>
		</Box>
	);
}

export default ProgressStepper;
