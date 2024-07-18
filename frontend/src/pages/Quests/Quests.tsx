import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Quests.css";

function CommunityQuests() {
	// Navigation Button Variable
	const [questSection, setQuestSection] = useState("open");

	// Fetch Community ID from URL
	const { id } = useParams();

	// Initialize Navigate Function
	const navigate = useNavigate();

	return (
		<>
			<button
				className="back-button-design"
				onClick={() => navigate(`/communities/${id}`)}
			>
				<img src="/icons/back-button-chevron.png" alt="back-button" />
				<p>Back</p>
			</button>
			<div className="quests-page">
				<h1 className="d-main-heading">Quests</h1>
				<div className="search-container">
					<input
						type="search"
						className="search"
						name="search"
						placeholder="Search Nearby"
					/>
					<img
						src="https://cdn1.iconfinder.com/data/icons/hawcons/32/698627-icon-111-search-512.png"
						alt="search-icon"
						className="search-icon"
					/>
				</div>
				{/* Quest Navigation Buttons */}
				<div className="quest-button-container">
					<button
						className={`quest-button-heading quest-button-design ${
							questSection === "open" ? "selected" : ""
						}`}
						onClick={() => setQuestSection("open")}
					>
						Open
					</button>
					<button
						className={`quest-button-heading quest-button-design ${
							questSection === "ongoing" ? "selected" : ""
						}`}
						onClick={() => setQuestSection("ongoing")}
					>
						Ongoing
					</button>
					<button
						className={`quest-button-heading quest-button-design ${
							questSection === "completed" ? "selected" : ""
						}`}
						onClick={() => setQuestSection("completed")}
					>
						Completed
					</button>
				</div>
				{/* Quests */}
				<div className="project-background">
					<p className="project-heading">Quest Name</p>
					<p className="project-sub-heading">Quest Sub-Heading</p>
					<p className="project-sub-heading">Location: N/A</p>
					<p className="project-text">Placeholder Description.</p>
					<button>
						<img
							src="/icons/expand-button-chevron.png"
							alt="expand-button"
						/>
					</button>
				</div>
				<div className="project-background">
					<p className="project-heading">Quest Name</p>
					<p className="project-sub-heading">Quest Sub-Heading</p>
					<p className="project-sub-heading">Location: N/A</p>
					<p className="project-text">Placeholder Description.</p>
					<button>
						<img
							src="/icons/expand-button-chevron.png"
							alt="expand-button"
						/>
					</button>
				</div>
				<div className="project-background">
					<p className="project-heading">Quest Name</p>
					<p className="project-sub-heading">Quest Sub-Heading</p>
					<p className="project-sub-heading">Location: N/A</p>
					<p className="project-text">Placeholder Description.</p>
					<button>
						<img
							src="/icons/expand-button-chevron.png"
							alt="expand-button"
						/>
					</button>
				</div>
				<div className="project-background">
					<p className="project-heading">Quest Name</p>
					<p className="project-sub-heading">Quest Sub-Heading</p>
					<p className="project-sub-heading">Location: N/A</p>
					<p className="project-text">Placeholder Description.</p>
					<button>
						<img
							src="/icons/expand-button-chevron.png"
							alt="expand-button"
						/>
					</button>
				</div>
			</div>
		</>
	);
}

export default CommunityQuests;
