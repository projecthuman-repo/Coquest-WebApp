import React, { useState } from "react";
import ProjectOverview from "./Components/Overview";
import ProjectMilestones from "./Components/Milestones";
import ProjectBids from "./Components/Bids";
import ProjectOffer from "./Components/Offer";
import ProjectDiscussions from "./Components/Discussions";
import ProjectVolunteering from "./Components/Volunteering";
import "./Description.css";

function ProjectsDescription() {
	// Navigation Button Variable
	const [section, setSection] = useState("overview");

	return (
		<>
			<div className="prj-d-page">
				<div className="prj-d-header-container">
					<h1 className="prj-d-main-heading">Placeholder Project</h1>
					<button className="prj-d-signup-button-design">
						Sign Up
					</button>
				</div>
				{/* Main Navigation Buttons */}
				<div className="prj-d-nav-button-container">
					<button
						className={`prj-d-button-design ${
							section === "overview" ? "prj-d-selected" : ""
						}`}
						onClick={() => setSection("overview")}
					>
						Overview
					</button>
					<button
						className={`prj-d-button-design ${
							section === "milestones" ? "prj-d-selected" : ""
						}`}
						onClick={() => setSection("milestones")}
					>
						Milestones
					</button>
					<button
						className={`prj-d-button-design ${
							section === "volunteering" ? "prj-d-selected" : ""
						}`}
						onClick={() => setSection("volunteering")}
					>
						Volunteering
					</button>
					<button
						className={`prj-d-button-design ${
							section === "bids" ? "prj-d-selected" : ""
						}`}
						onClick={() => setSection("bids")}
					>
						Open Bids
					</button>
					<button
						className={`prj-d-button-design ${
							section === "offer" ? "prj-d-selected" : ""
						}`}
						onClick={() => setSection("offer")}
					>
						Make an Offer
					</button>
					<button
						className={`prj-d-button-design ${
							section === "discussions" ? "prj-d-selected" : ""
						}`}
						onClick={() => setSection("discussions")}
					>
						Discussions
					</button>
				</div>
				{/* Overview Section */}
				{section === "overview" && <ProjectOverview />}
				{/* Milestones Section */}
				{section === "milestones" && <ProjectMilestones />}
				{/* Volunteering Section */}
				{section === "volunteering" && <ProjectVolunteering />}
				{/* Open Bids Section */}
				{section === "bids" && <ProjectBids />}
				{/* Make an Offer Section */}
				{section === "offer" && <ProjectOffer />}
				{/* Discussions Section */}
				{section === "discussions" && <ProjectDiscussions />}
				{/* Sign Up Modal */}
				{section === "sign-up" && <ProjectDiscussions />}
				{/* Edit Description Modal */}
				{section === "edit-description" && <ProjectDiscussions />}
			</div>
		</>
	);
}

export default ProjectsDescription;
