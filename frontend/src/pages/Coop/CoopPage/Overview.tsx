import React, { useState, useContext, useEffect } from "react";
import SharedCalendar from "../../../components/SharedCalendar/SharedCalendar";
import Quests from "../../../components/Quests";
import Members from "../../../components/Members/index";
import ProgramProgressBar from "../../../components/ProgramProgressBar/ProgramProgressBar";
import Budget from "../../../components/Budget/Budget";
import Funding from "../../../components/Funding/Funding";
import Input from "../../../components/Input";
import PrimaryButton from "../../../components/Buttons/PrimaryButton";
import { CoopContext } from "./CoopContext";
import "./Overview.css";
import "./index.css";

function CoopOverview() {
	const { coop, setCoop } = useContext(CoopContext);

	// edit coop description, objective and initiative
	const [editingDescStarted, setEditingDescStarted] = useState(false);
	const [editedDescription, setEditedDescription] = useState(
		coop?.description,
	);
	const [editedObjective, setEditedObjective] = useState(coop?.objective);
	const [editedInitiative, setEditedInitiative] = useState(coop?.initiative);

	const handleEditDescModal = () => {
		setEditingDescStarted(!editingDescStarted);

		if (!editingDescStarted) {
			document.body.style.overflow = "hidden";
			window.scrollTo(0, 0);
		} else document.body.style.overflow = "auto";
	};

	const editDesc = () => {
		if (coop && editedDescription && editedObjective && editedInitiative) {
			setCoop({
				...coop,
				description: editedDescription,
				objective: editedObjective,
				initiative: editedInitiative,
			});
		}

		//TODO edit coop description in backend
		handleEditDescModal();
	};

	useEffect(() => {
		if (!editingDescStarted) {
			setEditedDescription(coop?.description);
			setEditedObjective(coop?.objective);
			setEditedInitiative(coop?.initiative);
		}
	}, [editingDescStarted, coop]);

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
							<Input label="Coop description">
								<textarea
									rows={3}
									placeholder=""
									value={editedDescription}
									onChange={(e) =>
										setEditedDescription(e.target.value)
									}
								></textarea>
							</Input>

							<Input label="Coop objective">
								<textarea
									rows={3}
									placeholder=""
									value={editedObjective}
									onChange={(e) =>
										setEditedObjective(e.target.value)
									}
								></textarea>
							</Input>

							<Input label="Coop initiative">
								<textarea
									rows={3}
									placeholder=""
									value={editedInitiative}
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
								Coop Description
							</h2>
							<button
								className="prg-o-link"
								onClick={handleEditDescModal}
							>
								Edit
							</button>
						</div>
						<p className="prg-o-sub-text margin-top margin-bottom">
							{coop?.description}
						</p>
						<h2 className="prg-o-sub-heading margin-bottom">
							Project Objective
						</h2>
						<p className="prg-o-sub-text margin-bottom">
							{coop?.objective}
						</p>
						<h2 className="prg-o-sub-heading margin-bottom">
							Initiative
						</h2>
						<p className="prg-o-sub-text margin-bottom">
							{coop?.initiative}
						</p>
					</div>
					{/* Members */}
					<div className="prg-o-background">
						<Members
							users={["Test"]}
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
							progress={coop?.progress || 0}
						/>
					</div>
					{/* Budget */}
					<div className="prg-o-background">
						<Budget />
					</div>
				</div>

				<div>
					<div className="prg-o-right">
						{/* Coop Information */}
						<div className="prg-o-background">
							<h2 className="prg-o-sub-heading margin-bottom">
								Coop Information
							</h2>
							<p className="prg-o-sub-text">
								<b>Time: </b>
								{coop?.time}
							</p>
							<p className="prg-o-sub-text">
								<b>Date: </b>
								{coop?.date}
							</p>
							<p className="prg-o-sub-text">
								<b>Location: </b>
								{coop?.location}
							</p>
							<p className="prg-o-sub-text">
								<b>Spots Open: </b>
								{coop?.spots} seats left
							</p>
							<p className="prg-o-sub-text">
								<b>Cost: </b>${coop?.cost}
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
						<div className="prg-o-background">
							<Quests
								showAllLink={`${window.location.pathname}/quests`}
							/>
						</div>
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

export default CoopOverview;
