import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import ProgressStepper from "../../Programs/components/ProgressStepper";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import BackButton from "@/components/Buttons/BackButton";
import { ProjectProvider } from "./ProjectContext";
import { useProject } from "./ProjectContext";
import { useNavigate } from "react-router-dom";
import "./CreateProject.css";

const getCurrPath = (fullpath: string) => {
	return fullpath.substring(17, fullpath.length);
};

const CreateProjectContent = () => {
	const { project, stepsCompleted, updateStepsCompleted } = useProject();
	const [canProceed, setCanProceed] = useState(false);
	const location = useLocation();
	const [pageIndex, setPageIndex] = useState(0);
	const paths = [
		"basic-information",
		"operations",
		"budgeting",
		"promotion",
		"finish",
	];

	const navigate = useNavigate();

	useEffect(() => {
		// Update pageIndex and canProceed when user navigates to a different step
		const newPath = getCurrPath(location.pathname);
		setPageIndex(paths.indexOf(newPath));
		if (stepsCompleted[newPath])
			setCanProceed(stepsCompleted[newPath].canProceed);

		// make sure users can not enter a step if they have not completed the previous steps
		const nextStepToComplete = Object.entries(stepsCompleted).find(
			([_, step]) => step.canProceed === false,
		);
		if (
			stepsCompleted[newPath]?.canProceed === false &&
			nextStepToComplete &&
			newPath.localeCompare(nextStepToComplete[0]) > 0
		) {
			setPageIndex(paths.indexOf(nextStepToComplete[0]));
			navigate(`/projects/create/${nextStepToComplete[0]}`);
		}
	}, [location.pathname, stepsCompleted]);

	const handleNext = () => {
		if (!canProceed) {
			updateStepsCompleted(paths[pageIndex], false, true);
			alert("Please fill out all required fields.");
			return;
		}

		const nextIndex = pageIndex + 1;
		if (nextIndex < paths.length) {
			setPageIndex(nextIndex);
			navigate(`/projects/create/${paths[nextIndex]}`);
		}
	};

	const handleBack = () => {
		const prevIndex = pageIndex - 1;
		if (prevIndex >= 0) {
			setPageIndex(prevIndex);
			navigate(`/projects/create/${paths[prevIndex]}`);
		}
	};

	return (
		<div className="container">
			<div className="progress-bar-container">
				<ProgressStepper pgnum={pageIndex} />
			</div>
			<div className="main-container">
				<Outlet />
				<div className="navigate-buttons">
					{pageIndex > 0 && <BackButton onClick={handleBack} />}
					{pageIndex < paths.length - 1 && (
						<PrimaryButton name="Next" onClick={handleNext} />
					)}
					{pageIndex === paths.length - 1 && (
						<PrimaryButton
							name="Finish"
							onClick={() => {
								setPageIndex(0);
								navigate(`/projects/${project._id}`); // TODO: Redirect to newly created project using its ID
							}}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

const CreateProject = () => (
	<ProjectProvider>
		<CreateProjectContent />
	</ProjectProvider>
);

export default CreateProject;
