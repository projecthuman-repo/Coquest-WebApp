import React, { useState } from "react";
import "../Description.css";
import "./Coops.css";

function CommunityDescriptionCoops() {
	// Navigation Button Variable
	const [coopSection, setCoopSection] = useState("open-coops");

	return (
		<>
			<div className="com-c-search-container">
				<input
					type="search"
					className="com-c-search"
					name="search"
					placeholder="Search Nearby"
				/>
				<img
					src="https://cdn1.iconfinder.com/data/icons/hawcons/32/698627-icon-111-search-512.png"
					alt="search-icon"
					className="com-c-search-icon"
				/>
			</div>
			<div className="quest-button-container">
				<button
					className={`quest-button-heading quest-button-design ${
						coopSection === "my-coops" ? "com-d-selected" : ""
					}`}
					onClick={() => setCoopSection("my-coops")}
				>
					My Co-ops
				</button>
				<button
					className={`quest-button-heading quest-button-design ${
						coopSection === "open-coops" ? "com-d-selected" : ""
					}`}
					onClick={() => setCoopSection("open-coops")}
				>
					Open Co-ops
				</button>
				<button
					className={`quest-button-heading quest-button-design ${
						coopSection === "completed-coops"
							? "com-d-selected"
							: ""
					}`}
					onClick={() => setCoopSection("completed-coops")}
				>
					Completed Co-ops
				</button>
			</div>
			<div className="com-c-container margin-top">
				<div className="com-c-background">
					<p className="com-c-heading">Co-op Name</p>
					<p className="com-c-sub-heading">Co-op Sub-Heading</p>
					<p className="com-c-sub-heading">Location: N/A</p>
					<p className="com-c-text">Placeholder Description.</p>
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

export default CommunityDescriptionCoops;
