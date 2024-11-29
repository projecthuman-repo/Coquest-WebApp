import React, { useState, useContext } from "react";
import ProgramProgressBar from "../../../components/ProgramProgressBar/ProgramProgressBar";
import Input from "../../../components/Input";
import PrimaryButton from "../../../components/Buttons/PrimaryButton";
import MilestoneCard from "@/pages/Programs/components/MilestoneCard/MilestoneCard";
import { ProjectContext } from "./ProjectContext";
import { Milestone } from "@/models/programModel";
import "./Milestones.css";
import "./index.css";

function ProjectMilestones() {
	const { project, updateProject } = useContext(ProjectContext);

	// Milestone addition state
	const [addingStarted, setAddingStarted] = useState(false);
	const [milestoneTitle, setMilestoneTitle] = useState("");
	const [milestoneDescription, setMilestoneDescription] = useState("");

	function handleAddModal() {
		setAddingStarted(!addingStarted);

		if (!addingStarted) {
			document.body.style.overflow = "hidden";
			window.scrollTo(0, 0);
		} else document.body.style.overflow = "auto";
	}

	function handleMilestoneAdd() {
		if (project) {
			const newMilestone: Milestone = {
				type: "project", // Specify the type for the milestone
				title: milestoneTitle,
				completed: false,
				description: milestoneDescription,
				completedBy: "",
				dateStarted: new Date().toISOString(),
				dateCompleted: "",
			};

			// Update the project milestones
			updateProject({
				...project,
				milestones: [...(project.milestones || []), newMilestone],
			});

			// Reset modal state
			handleAddModal();
			setMilestoneTitle("");
			setMilestoneDescription("");
		}
	}

	return (
		<div className="prg-m-container">
			{addingStarted && (
				<div className="add-milestone-modal-container">
					<div className="add-milestone-modal">
						<div className="add-milestone-header">
							<p>Add new milestone</p>
							<button onClick={handleAddModal}>
								<img
									src="/icons/close-grey.png"
									alt="Close Icon"
								/>
							</button>
						</div>

						<div className="add-milestone-form">
							<div>
								<p>What would you like to add</p>
							</div>

							<Input label="Milestone title">
								<input
									type="text"
									value={milestoneTitle}
									onChange={(e) =>
										setMilestoneTitle(e.target.value)
									}
								/>
							</Input>

							<Input label="Milestone description">
								<textarea
									rows={5}
									value={milestoneDescription}
									onChange={(e) =>
										setMilestoneDescription(e.target.value)
									}
								></textarea>
							</Input>
						</div>

						<div className="add-milestone">
							<PrimaryButton
								name="Add"
								onClick={handleMilestoneAdd}
							/>
						</div>
					</div>
				</div>
			)}

			<div className="prg-m-pb-container">
				<ProgramProgressBar
					seeHistory={false}
					progress={project?.progress || 0}
				/>
			</div>

			<div className="prg-m-heading-container">
				<h2 className="prg-m-heading">Milestones</h2>
				<button
					className="prg-m-button-design"
					onClick={handleAddModal}
				>
					Add New Milestone
				</button>
			</div>

			<div className="project-milestones">
				{project?.milestones?.map((milestone) => (
					<MilestoneCard
						key={`${milestone.title} + ${milestone.dateStarted}`}
						milestone={milestone}
						type="project"
					/>
				))}
			</div>
		</div>
	);
}

export default ProjectMilestones;
