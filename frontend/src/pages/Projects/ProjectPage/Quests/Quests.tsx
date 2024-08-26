import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Quests.css";

function QuestsPage() {
	// Navigation Button Variable
	const [section, setSection] = useState("open");

	// Initialize Navigate Function and Variable
	const navigate = useNavigate();

	return (
		<>
			<button
				className="quests-back-button-design"
				onClick={() =>
					navigate(window.location.pathname.replace(/\/quests$/, ""))
				}
			>
				<img src="/icons/back-button-chevron.png" alt="back-button" />
				<p>Back</p>
			</button>
			{/* Heading */}
			<div className="quests-heading-container">
				<h1 className="quests-main-heading">Quests</h1>
				<div className="quests-search-container">
					<input
						type="search"
						className="quests-search"
						name="search"
						placeholder="Search Nearby"
					/>
					<img
						src="https://cdn1.iconfinder.com/data/icons/hawcons/32/698627-icon-111-search-512.png"
						alt="search-icon"
						className="quests-search-icon"
					/>
				</div>
			</div>
			{/* Navigation Buttons */}
			<div className="quests-nav-button-container">
				<button
					className={`quests-nav-button-design ${
						section === "open" ? "quests-nav-button-selected" : ""
					}`}
					onClick={() => setSection("open")}
				>
					Open
				</button>
				<button
					className={`quests-nav-button-design ${
						section === "ongoing"
							? "quests-nav-button-selected"
							: ""
					}`}
					onClick={() => setSection("ongoing")}
				>
					Ongoing
				</button>
				<button
					className={`quests-nav-button-design ${
						section === "completed"
							? "quests-nav-button-selected"
							: ""
					}`}
					onClick={() => setSection("completed")}
				>
					Completed
				</button>
			</div>
			{/* Main Content */}
			<div className="quests-container margin-top">
				<div className="quests-widget">
					<h1 className="quests-widget-heading">Task Name</h1>
					<h2 className="quests-widget-heading-small">
						Project Name
					</h2>
					<h2 className="quests-widget-heading-small">
						Location Name
					</h2>
					<p className="margin-top">Description</p>
					<div className="quests-widget-expand margin-top">
						<button>
							<img
								src="/icons/expand-button-chevron.png"
								alt="expand-icon"
							/>
						</button>
					</div>
				</div>
				<div className="quests-widget">
					<h1 className="quests-widget-heading">Task Name</h1>
					<h2 className="quests-widget-heading-small">
						Project Name
					</h2>
					<h2 className="quests-widget-heading-small">
						Location Name
					</h2>
					<p className="margin-top">Description</p>
					<div className="quests-widget-expand margin-top">
						<button>
							<img
								src="/icons/expand-button-chevron.png"
								alt="expand-icon"
							/>
						</button>
					</div>
				</div>
				<div className="quests-widget">
					<h1 className="quests-widget-heading">Task Name</h1>
					<h2 className="quests-widget-heading-small">
						Project Name
					</h2>
					<h2 className="quests-widget-heading-small">
						Location Name
					</h2>
					<p className="margin-top">Description</p>
					<div className="quests-widget-expand margin-top">
						<button>
							<img
								src="/icons/expand-button-chevron.png"
								alt="expand-icon"
							/>
						</button>
					</div>
				</div>
			</div>
		</>
	);
}

export default QuestsPage;
