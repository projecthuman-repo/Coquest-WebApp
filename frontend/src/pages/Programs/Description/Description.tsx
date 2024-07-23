import React, { useState } from "react";
import ProgramOverview from "./Components/Overview";
import ProgramMilestones from "./Components/Milestones";
import ProgramBids from "./Components/Bids";
import ProgramOffer from "./Components/Offer";
import ProgramDiscussions from "./Components/Discussions";
import ProgramVolunteering from "./Components/Volunteering";
import "./Description.css";

function ProgramsDescription() {
	// Navigation Button Variable
	const [section, setSection] = useState("overview");

	return (
		<>
			<div className="prg-d-page">
				<div className="prg-d-header-container">
					<h1 className="prg-d-main-heading">Placeholder Program</h1>
					<button className="prg-d-signup-button-design">
						Sign Up
					</button>
				</div>
				{/* Main Navigation Buttons */}
				<div className="prg-d-nav-button-container">
					<button
						className={`prg-d-button-design ${
							section === "overview" ? "prg-d-selected" : ""
						}`}
						onClick={() => setSection("overview")}
					>
						Overview
					</button>
					<button
						className={`prg-d-button-design ${
							section === "milestones" ? "prg-d-selected" : ""
						}`}
						onClick={() => setSection("milestones")}
					>
						Milestones
					</button>
					<button
						className={`prg-d-button-design ${
							section === "volunteering" ? "prg-d-selected" : ""
						}`}
						onClick={() => setSection("volunteering")}
					>
						Volunteering
					</button>
					<button
						className={`prg-d-button-design ${
							section === "bids" ? "prg-d-selected" : ""
						}`}
						onClick={() => setSection("bids")}
					>
						Open Bids
					</button>
					<button
						className={`prg-d-button-design ${
							section === "offer" ? "prg-d-selected" : ""
						}`}
						onClick={() => setSection("offer")}
					>
						Make an Offer
					</button>
					<button
						className={`prg-d-button-design ${
							section === "discussions" ? "prg-d-selected" : ""
						}`}
						onClick={() => setSection("discussions")}
					>
						Discussions
					</button>
				</div>
				{/* Overview Section */}
				{section === "overview" && <ProgramOverview />}
				{/* Milestones Section */}
				{section === "milestones" && <ProgramMilestones />}
				{/* Volunteering Section */}
				{section === "volunteering" && <ProgramVolunteering />}
				{/* Open Bids Section */}
				{section === "bids" && <ProgramBids />}
				{/* Make an Offer Section */}
				{section === "offer" && <ProgramOffer />}
				{/* Discussions Section */}
				{section === "discussions" && <ProgramDiscussions />}
				{/* Sign Up Modal */}
				{section === "sign-up" && <ProgramDiscussions />}
				{/* Edit Description Modal */}
				{section === "edit-description" && <ProgramDiscussions />}
			</div>
		</>
	);
}

export default ProgramsDescription;
