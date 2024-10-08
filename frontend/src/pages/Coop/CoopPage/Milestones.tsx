import React, { useState, useContext } from "react";
import ProgramProgressBar from "../../../components/ProgramProgressBar/ProgramProgressBar";
// import MilestoneCard from "../components/MilestoneCard/MilestoneCard";
import Input from "../../../components/Input";
import PrimaryButton from "../../../components/Buttons/PrimaryButton";
import { CoopContext } from "./CoopContext";
import "./Milestones.css";
import "./index.css";

function CoopMilestones() {
	const { coop, setCoop } = useContext(CoopContext);

	//milestone addition
	const [addingStarted, setAddingStarted] = useState(false);
	const [milestoneType, setMilestoneType] = useState("Milestone");
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
			const newMilestone = {
				id: `${coop?.milestones.length + 1}`,
				type: milestoneType,
				title: milestoneTitle,
				progress: 0,
				description: milestoneDescription,
				completedBy: "",
				dateStarted: "",
				dateCompleted: "",
			};

			setCoop({
				...coop,
				milestones: [...coop.milestones, newMilestone],
			});
		}
		//TODO: update program milestones in backend

		handleAddModal();
		setMilestoneType("Milestone");
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

								<div className="milestone-type-options">
									<div>
										<input
											type="radio"
											id="milestone"
											name="milestone"
											value="milestone"
											checked={
												milestoneType === "Milestone"
											}
											onChange={() =>
												setMilestoneType("Milestone")
											}
										/>
										<label htmlFor="milestone">
											Milestone
										</label>
									</div>

									<div>
										<input
											type="radio"
											id="goal"
											name="goal"
											value="goal"
											checked={milestoneType === "Goal"}
											onChange={() =>
												setMilestoneType("Goal")
											}
										/>
										<label htmlFor="goal">Goal</label>
									</div>
								</div>
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

			{/* <div className="program-milestones">
				{coop?.milestones.map((milestone: any, index: number) => (
					<MilestoneCard
						key={index}
						milestone={milestone}
						type="program"
					/>
				))}
			</div> */}
		</div>
	);
}

export default CoopMilestones;
