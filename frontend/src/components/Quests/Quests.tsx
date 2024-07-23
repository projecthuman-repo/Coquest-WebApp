import React, { useState } from "react";
import "./Quests.css";

function Quests() {
	// Navigation Button Variable
	const [questSection, setQuestSection] = useState("open");

	return (
		<>
			<div className="ppb-heading-container">
				<h2 className="quest-heading">Quests</h2>
				<a href="/" className="quest-link">
					See All
				</a>
			</div>
			<div className="quest-button-container">
				<button
					className={`quest-button-heading quest-button-design ${
						questSection === "open" ? "quest-selected" : ""
					}`}
					onClick={() => setQuestSection("open")}
				>
					Open
				</button>
				<button
					className={`quest-button-heading quest-button-design ${
						questSection === "ongoing" ? "quest-selected" : ""
					}`}
					onClick={() => setQuestSection("ongoing")}
				>
					Ongoing
				</button>
				<button
					className={`quest-button-heading quest-button-design ${
						questSection === "completed" ? "quest-selected" : ""
					}`}
					onClick={() => setQuestSection("completed")}
				>
					Completed
				</button>
			</div>
			<div className="quest-container">
				<p>Example Quest</p>
				<button>
					<img
						src="/icons/next-button-chevron.png"
						alt="view-button"
					/>
				</button>
			</div>
			<div className="quest-container">
				<p>Example Quest</p>
				<button>
					<img
						src="/icons/next-button-chevron.png"
						alt="view-button"
					/>
				</button>
			</div>
			<div className="quest-container">
				<p>Example Quest</p>
				<button>
					<img
						src="/icons/next-button-chevron.png"
						alt="view-button"
					/>
				</button>
			</div>
			<div className="quest-container">
				<p>Example Quest</p>
				<button>
					<img
						src="/icons/next-button-chevron.png"
						alt="view-button"
					/>
				</button>
			</div>
		</>
	);
}

export default Quests;
