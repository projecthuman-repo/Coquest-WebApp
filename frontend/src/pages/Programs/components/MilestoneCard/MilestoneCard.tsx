import React, { useState, useEffect, useContext } from "react";
import MilestoneProgressBar from "../../../../components/ProgramProgressBar/MilestoneProgressBar";
import DeleteButton from "../../../../components/Buttons/DeleteButton";
import OutlineButton from "../../../../components/Buttons/OutlineButton";
import Input from "../../../../components/Input";
import PrimaryButton from "../../../../components/Buttons/PrimaryButton";
import { Milestone } from "../../../../models/programModel";
import { ProgramContext } from "../../ProgramPage/ProgramContext";
import { ProjectContext } from "../../../Projects/ProjectPage/ProjectContext";
import "./MilestoneCard.css";
import { CoopContext } from "@/pages/Coop/CoopPage/CoopContext";

interface MilestoneCardProps {
	milestone: Milestone;
	type: "program" | "project" | "coop"; // "program" or "project" for which milestone is
}

function MilestoneCard({ milestone, type }: MilestoneCardProps) {
	const { program, setProgram } = useContext(ProgramContext);
	const { project, setProject } = useContext(ProjectContext);
	const { coop, updateCoop } = useContext(CoopContext);
	const [expanded, setExpanded] = useState(false);
	const [displayDesc, setDisplayDesc] = useState(milestone.description);

	//edit milestone states
	const [scrollY, setScrollY] = useState(0);
	const [editingStarted, setEditingStarted] = useState(false);
	const [milestoneType, setMilestoneType] = useState(type);
	const [milestoneTitle, setMilestoneTitle] = useState(milestone.title);
	const [milestoneDescription, setMilestoneDescription] = useState(
		milestone.description,
	);

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
		if (type === "program" && program) {
			setProgram({
				...program,
				milestones: program.milestones.map((m) => {
					if (m.id === milestone.id) {
						return {
							...m,
							type: milestoneType,
							title: milestoneTitle,
							description: milestoneDescription,
						};
					}
					return m;
				}),
			});
		} else if (type === "project" && project) {
			setProject({
				...project,
				milestones: project.milestones.map((m) => {
					if (m.id === milestone.id) {
						return {
							...m,
							type: milestoneType,
							title: milestoneTitle,
							description: milestoneDescription,
						};
					}
					return m;
				}),
			});
		} else if (type === "coop" && coop) {
			updateCoop({
				...coop,
				milestones: coop.milestones.map((m) => {
					if (m.id === milestone.id) {
						return {
							...m,
							type: milestoneType,
							title: milestoneTitle,
							description: milestoneDescription,
						};
					}
					return m;
				}),
			});
		}

		//TODO edit milestone in backend
		handleEditModal();
	}

	function handleDelete() {
		if (type === "program" && program) {
			setProgram({
				...program,
				milestones: program.milestones.filter(
					(m) => m.id !== milestone.id,
				),
			});
		} else if (type === "project" && project) {
			setProject({
				...project,
				milestones: project.milestones.filter(
					(m) => m.id !== milestone.id,
				),
			});
		} else if (type === "coop" && coop) {
			updateCoop({
				...coop,
				milestones: coop.milestones.filter(
					(m) => m.id !== milestone.id,
				),
			});
		}


		//TODO delete milestone in backend
	}

	useEffect(() => {
		setMilestoneType(milestone.type);
		setMilestoneTitle(milestone.title);
		setMilestoneDescription(milestone.description);

		if (milestone.description.length > 350 && !expanded) {
			setDisplayDesc(milestone.description.slice(0, 350) + "...");
		} else setDisplayDesc(milestone.description);
	}, [
		milestone.description,
		expanded,
		editingStarted,
		milestone.title,
		milestone.type,
	]);

	return (
		<>
			{editingStarted && (
				<div className="edit-milestone-modal-container">
					<div className="edit-milestone-modal">
						<div className="edit-milestone-header">
							<p>Edit {milestone.title}</p>
							<button onClick={handleEditModal}>
								<img
									src="/icons/close-grey.png"
									alt="Close Icon"
								/>
							</button>
						</div>

						<div className="edit-milestone-form">
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
						<p className="prg-m-heading">{milestone.title}</p>
						<div className="prg-m-mpb-container">
							<MilestoneProgressBar
								progress={milestone.progress}
							/>
						</div>
					</div>
					<p className="prg-m-text">{displayDesc}</p>
					{expanded && (
						<p className="prg-m-text">
							<b>Completed By: </b>{" "}
							{milestone.completedBy === ""
								? "N/A"
								: milestone.completedBy}
						</p>
					)}
					{expanded && (
						<p className="prg-m-sub-text">
							<b>Date Started: </b>
							{new Date(milestone.dateStarted) instanceof Date &&
							!isNaN(new Date(milestone.dateStarted).getTime())
								? new Date(
										milestone.dateStarted,
									).toLocaleDateString("en-US", {
										year: "numeric",
										month: "long",
										day: "numeric",
									})
								: "N/A"}
						</p>
					)}
					{expanded && (
						<p className="prg-m-sub-text">
							<b>Date Completed: </b>
							{new Date(milestone.dateCompleted) instanceof
								Date &&
							!isNaN(new Date(milestone.dateCompleted).getTime())
								? new Date(
										milestone.dateCompleted,
									).toLocaleDateString("en-US", {
										year: "numeric",
										month: "long",
										day: "numeric",
									})
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
