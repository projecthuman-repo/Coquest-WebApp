import React, { useState, useContext } from "react";
import SharedCalendar from "../../../components/SharedCalendar/SharedCalendar";
import Quests from "../../../components/Quests";
import Members from "../../../components/Members/index";
import ProgramProgressBar from "../../../components/ProgramProgressBar/ProgramProgressBar";
import Budget from "../../../components/Budget/Budget";
import Funding from "../../../components/Funding/Funding";
import Input from "../../../components/Input";
import PrimaryButton from "../../../components/Buttons/PrimaryButton";
import { ProgramContext } from "./ProgramContext";
import "./Overview.css";
import "./index.css";

function ProgramOverview() {
	const { program, updateProgram } = useContext(ProgramContext);

	// edit program description, objective and initiative
	const [editingDescStarted, setEditingDescStarted] = useState(false);
	const [editedDescription, setEditedDescription] = useState(
		program?.summary,
	);
	const [editedObjective, setEditedObjective] = useState(program?.mission);
	const [editedInitiative, setEditedInitiative] = useState(program?.type);

	const handleEditDescModal = () => {
		setEditingDescStarted(!editingDescStarted);

		if (!editingDescStarted) {
			document.body.style.overflow = "hidden";
			window.scrollTo(0, 0);
		} else document.body.style.overflow = "auto";
	};

	const editDesc = () => {
		if (
			program &&
			editedDescription &&
			editedObjective &&
			editedInitiative
		) {
			updateProgram({
				...program,
				summary: editedDescription,
				mission: editedObjective,
				type: editedInitiative,
			});
		}

		handleEditDescModal();
	};

	return (
		<>
			{editingDescStarted && (
				<div className="edit-desc-modal-container">
					<div className="edit-desc-modal">
						<div className="editing-header">
							<p>Edit description</p>
							<button onClick={handleEditDescModal}>
								<img
									src="/icons/close-grey.png"
									alt="Close Icon"
								/>
							</button>
						</div>

						<div className="editing-form">
							<Input label="Program description">
								<textarea
									rows={3}
									placeholder=""
									value={editedDescription ?? ""}
									onChange={(e) =>
										setEditedDescription(e.target.value)
									}
								></textarea>
							</Input>

							<Input label="Program objective">
								<textarea
									rows={3}
									placeholder=""
									value={editedObjective ?? ""}
									onChange={(e) =>
										setEditedObjective(e.target.value)
									}
								></textarea>
							</Input>

							<Input label="Program initiative">
								<textarea
									rows={3}
									placeholder=""
									value={editedInitiative ?? ""}
									onChange={(e) =>
										setEditedInitiative(e.target.value)
									}
								></textarea>
							</Input>
						</div>

						<div className="edit-desc">
							<PrimaryButton name="Save" onClick={editDesc} />
						</div>
					</div>
				</div>
			)}

			<div className="prg-o-container">
				<div>
					{/* Description, Objective and Initiative */}
					<div className="prg-o-background">
						<div className="prg-o-heading-container">
							<h2 className="prg-o-sub-heading">
								Program Description
							</h2>
							<button
								className="prg-o-link"
								onClick={handleEditDescModal}
							>
								Edit
							</button>
						</div>
						<p className="prg-o-sub-text margin-top margin-bottom">
							{program?.summary}
						</p>
						<h2 className="prg-o-sub-heading margin-bottom">
							Program Objective
						</h2>
						<p className="prg-o-sub-text margin-bottom">
							{program?.mission}
						</p>
						<h2 className="prg-o-sub-heading margin-bottom">
							Initiative
						</h2>
						<p className="prg-o-sub-text margin-bottom">
							{program?.type}
						</p>
					</div>
					{/* Members */}
					<div className="prg-o-background">
						<Members
							users={
								program?.members?.map(
									(member) => member.username ?? "",
								) ?? []
							}
							userRole={["Role"]}
							showAllLink={
								window.location.pathname.slice(-1) === "/"
									? window.location.pathname + "members"
									: window.location.pathname + "/members"
							}
						/>
					</div>
					{/* Progress */}
					<div className="prg-o-background">
						<ProgramProgressBar
							seeHistory={true}
							progress={program?.progress || 0}
						/>
					</div>
					{/* Budget */}
					<div className="prg-o-background">
						<Budget />
					</div>
				</div>

				<div>
					<div className="prg-o-right">
						{/* Program Information */}
						<div className="prg-o-background">
							<h2 className="prg-o-sub-heading margin-bottom">
								Program Information
							</h2>
							<p className="prg-o-sub-text">
								<b>Recurring: </b>
								{program?.recurring}
							</p>
							<p className="prg-o-sub-text">
								<b>Start Date: </b>
								{program?.startDate}
							</p>
							<p className="prg-o-sub-text">
								<b>End Date: </b>
								{program?.endDate}
							</p>
							<p className="prg-o-sub-text">
								<b>Location: </b>
								{program?.location?.name}
							</p>
							<p className="prg-o-sub-text">
								<b>Spots Open: </b>
								{program?.spots} seats left
							</p>
							<p className="prg-o-sub-text">
								<b>Cost: </b>${program?.cost}
							</p>
						</div>
						{/* Calendar */}
						<div className="prg-o-background">
							<h2 className="prg-o-sub-heading margin-bottom">
								Calendar
							</h2>
							<SharedCalendar />
						</div>
						{/* Quests */}
						{/* <div className="prg-o-background">
							<Quests
								showAllLink={`${window.location.pathname}/quests`}
							/>
						</div> */}
						{/* Funding */}
						<div className="prg-o-background">
							<Funding />
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default ProgramOverview;
