import React, { useState, useContext } from "react";
import ProgramProgressBar from "../../../components/ProgramProgressBar/ProgramProgressBar";
import Input from "../../../components/Input";
import PrimaryButton from "../../../components/Buttons/PrimaryButton";
import { CoopContext } from "./CoopContext";
import "./Milestones.css";
import "./index.css";
import MilestoneCard from "@/pages/Programs/components/MilestoneCard/MilestoneCard";
import { Milestone } from "@/models/programModel";

function CoopMilestones() {
	const { coop, updateCoop } = useContext(CoopContext);

	//milestone addition
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
		if (coop) {
			const newMilestone: Milestone = {
				_id: `${coop?.milestones.length + 1}`,
				type: "coop",
				title: milestoneTitle,
				progress: 0,
				description: milestoneDescription,
				completedBy: "",
				dateStarted: "",
				dateCompleted: "",
			};

			updateCoop({
				...coop,
				milestones: [...coop.milestones, newMilestone],
			});
		}
		//TODO: update program milestones in backend

		// Resetting previous values
		handleAddModal();
		setMilestoneTitle("");
		setMilestoneDescription("");
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
									placeholder=""
									value={milestoneTitle}
									onChange={(e) =>
										setMilestoneTitle(e.target.value)
									}
								/>
							</Input>

							<Input label="Milestone description">
								<textarea
									rows={5}
									placeholder=""
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
					progress={coop?.progress || 0}
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

			<div className="program-milestones">
				{coop?.milestones.map((milestone) => (
					<MilestoneCard
						key={milestone._id}
						milestone={milestone}
						type="coop"
					/>
				))}
			</div>
		</div>
	);
}

export default CoopMilestones;
