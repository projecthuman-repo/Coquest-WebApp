import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import OutlineButton from "../../../../components/Buttons/OutlineButton";
import { ProgramRole } from "../../../../models/roleModel";
import "./RoleCard.css";

function ProgramRoleCard({
	id,
	title,
	program,
	location,
	description,
	qualifications,
	datePosted,
	salary,
	applicants,
}: ProgramRole) {
	const [expanded, setExpanded] = useState(false);
	const [displayDesc, setDisplayDesc] = useState(description);

	const navigate = useNavigate();

	function handleApply() {
		window.scrollTo(0, 0);
		navigate(
			window.location.pathname.slice(-1) === "/"
				? window.location.pathname + id + "/apply"
				: window.location.pathname + "/" + id + "/apply",
		);
	}

	function handleViewApplications() {
		window.scrollTo(0, 0);
		navigate(
			window.location.pathname.slice(-1) === "/"
				? window.location.pathname + id + "/applications"
				: window.location.pathname + "/" + id + "/applications",
		);
	}

	useEffect(() => {
		if (description.length > 350 && !expanded) {
			setDisplayDesc(description.slice(0, 350) + "...");
		} else setDisplayDesc(description);
	}, [description, expanded]);

	return (
		<>
			<div className="role-container" key={id}>
				<div className="role-header">
					<div>
						<p className="text-heading">{title}</p>
						<div className="role-pro-loc">
							<p>{program}</p>
							<p>{location}</p>
						</div>
					</div>
					<div className="text-align-right">
						<div className="role-salary">
							{salary ? (
								<p>
									Salary: <span>${salary}</span>
								</p>
							) : (
								<p>Volunteer</p>
							)}
						</div>
						<div className="role-date">
							<p>
								Posted:{" "}
								{new Date(datePosted) instanceof Date &&
								!isNaN(new Date(datePosted).getTime())
									? new Date(datePosted).toLocaleDateString(
											"en-US",
											{
												year: "numeric",
												month: "long",
												day: "numeric",
											},
										)
									: "N/A"}
							</p>
						</div>
					</div>
				</div>
				<div className="role-description">
					{expanded && <p className="text-bold">Description</p>}
					<p>{displayDesc}</p>
				</div>

				{expanded && (
					<div className="role-qualifications">
						<p className="text-bold">Qualifications</p>
						<p>{qualifications}</p>
					</div>
				)}
				{expanded && (
					<div className="role-apply">
						<OutlineButton
							name="Apply"
							onClick={handleApply}
							filled={true}
						/>

						{/* TODO: Display this button only if a user is a program admin */}
						<OutlineButton
							name="Applications"
							onClick={handleViewApplications}
							filled={true}
						/>

						<small>
							+{applicants ? applicants.length : 0} applied to
							this position.
						</small>
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
		</>
	);
}

export default ProgramRoleCard;
