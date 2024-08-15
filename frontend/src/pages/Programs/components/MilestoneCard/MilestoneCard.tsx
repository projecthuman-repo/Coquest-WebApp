import React, { useState, useEffect, useContext } from "react";
import MilestoneProgressBar from "../../../../components/ProgramProgressBar/MilestoneProgressBar";
import DeleteButton from "../../../../components/Buttons/DeleteButton";
import OutlineButton from "../../../../components/Buttons/OutlineButton";
import Input from "../../../../components/Input";
import PrimaryButton from "../../../../components/Buttons/PrimaryButton";
import { Milestone } from "../../../../models/programModel";
import { ProgramContext } from "../../ProgramPage/ProgramContext";
import "./MilestoneCard.css";

function MilestoneCard({
	id,
	type,
	title,
	progress,
	description,
	completedBy,
	dateStarted,
	dateCompleted,
}: Milestone) {
	const { program, setProgram } = useContext(ProgramContext);

	const [expanded, setExpanded] = useState(false);
	const [displayDesc, setDisplayDesc] = useState(description);

	//edit milestone states
	const [scrollY, setScrollY] = useState(0);
	const [editingStarted, setEditingStarted] = useState(false);
	const [milestoneType, setMilestoneType] = useState(type);
	const [milestoneTitle, setMilestoneTitle] = useState(title);
	const [milestoneDescription, setMilestoneDescription] =
		useState(description);

	function handleEditModal() {
		setEditingStarted(!editingStarted);

		setScrollY(window.scrollY);
		if (!editingStarted) {
			document.body.style.overflow = "hidden";
			window.scrollTo(0, 0);
		} else {
			document.body.style.overflow = "auto";
			window.scrollTo(0, scrollY);
		}
	}

	function handleMilestoneEdit() {
		if (program)
			setProgram({
				...program,
				milestones: program.milestones.map((milestone) => {
					if (milestone.id === id) {
						return {
							...milestone,
							type: milestoneType,
							title: milestoneTitle,
							description: milestoneDescription,
						};
					}
					return milestone;
				}),
			});

		//TODO edit milestone in backend
		handleEditModal();
	}

	function handleDelete() {
		if (program)
			setProgram({
				...program,
				milestones: program.milestones.filter(
					(milestone) => milestone.id !== id,
				),
			});

		//TODO delete milestone in backend
	}

	useEffect(() => {
		setMilestoneType(type);
		setMilestoneTitle(title);
		setMilestoneDescription(description);

		if (description.length > 350 && !expanded) {
			setDisplayDesc(description.slice(0, 350) + "...");
		} else setDisplayDesc(description);
	}, [description, expanded, editingStarted, title, type]);

	return (
		<>
			{editingStarted && (
				<div className="edit-milestone-modal-container">
					<div className="edit-milestone-modal">
						<div className="edit-milestone-header">
							<p>Edit {title}</p>
							<button onClick={handleEditModal}>
								<img
									src="/icons/close-grey.png"
									alt="Close Icon"
								/>
							</button>
						</div>

						<div className="edit-milestone-form">
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

						<div className="edit-milestone">
							<PrimaryButton
								name="Save"
								onClick={handleMilestoneEdit}
							/>
						</div>
					</div>
				</div>
			)}

			<div className="prg-m-container">
				<div className="prg-m-background">
					<div className="milestone-header">
						<p className="prg-m-heading">{title}</p>
						<div className="prg-m-mpb-container">
							<MilestoneProgressBar progress={progress} />
						</div>
					</div>
					<p className="prg-m-text">{displayDesc}</p>
					{expanded && (
						<p className="prg-m-text">
							<b>Completed By: </b>{" "}
							{completedBy === "" ? "N/A" : completedBy}
						</p>
					)}
					{expanded && (
						<p className="prg-m-sub-text">
							<b>Date Started: </b>
							{new Date(dateStarted) instanceof Date &&
							!isNaN(new Date(dateStarted).getTime())
								? new Date(dateStarted).toLocaleDateString(
										"en-US",
										{
											year: "numeric",
											month: "long",
											day: "numeric",
										},
									)
								: "N/A"}
						</p>
					)}
					{expanded && (
						<p className="prg-m-sub-text">
							<b>Date Completed: </b>
							{new Date(dateCompleted) instanceof Date &&
							!isNaN(new Date(dateCompleted).getTime())
								? new Date(dateCompleted).toLocaleDateString(
										"en-US",
										{
											year: "numeric",
											month: "long",
											day: "numeric",
										},
									)
								: "N/A"}
						</p>
					)}
					{expanded && (
						<div className="milestone-delete-edit-btns">
							<DeleteButton onClick={handleDelete} />
							<OutlineButton
								name="Edit"
								onClick={handleEditModal}
							/>
						</div>
					)}
					<button onClick={() => setExpanded(!expanded)}>
						{expanded ? (
							<img
								src="/icons/collapse-button-chevron.png"
								alt="collapse-button"
							/>
						) : (
							<img
								src="/icons/expand-button-chevron.png"
								alt="expand-button"
							/>
						)}
					</button>
				</div>
			</div>
		</>
	);
}

export default MilestoneCard;
