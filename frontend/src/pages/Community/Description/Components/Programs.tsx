import React, { useState } from "react";
import "../Description.css";
import "./Programs.css";

function CommunityDescriptionPrograms() {
	// Navigation Button Variable
	const [programSection, setProgramSection] = useState("open-programs");

	return (
		<>
			<div className="com-pro-search-container">
				<input
					type="search"
					className="search"
					name="com-pro-search"
					placeholder="Search Nearby"
				/>
				<img
					src="https://cdn1.iconfinder.com/data/icons/hawcons/32/698627-icon-111-search-512.png"
					alt="search-icon"
					className="com-pro-search-icon"
				/>
			</div>
			<div className="quest-button-container">
				<button
					className={`quest-button-heading quest-button-design ${
						programSection === "my-programs" ? "com-d-selected" : ""
					}`}
					onClick={() => setProgramSection("my-programs")}
				>
					My Programs
				</button>
				<button
					className={`quest-button-heading quest-button-design ${
						programSection === "open-programs" ? "com-d-selected" : ""
					}`}
					onClick={() => setProgramSection("open-programs")}
				>
					Open Programs
				</button>
				<button
					className={`quest-button-heading quest-button-design ${
						programSection === "completed-programs"
							? "com-d-selected"
							: ""
					}`}
					onClick={() => setProgramSection("completed-programs")}
				>
					Completed Programs
				</button>
			</div>
			<div className="com-pro-container margin-top">
				<div className="com-pro-background">
					<p className="com-pro-heading">Program Name</p>
					<p className="com-pro-sub-heading">Program Sub-Heading</p>
					<p className="com-pro-sub-heading">Location: N/A</p>
					<p className="com-pro-text">Placeholder Description.</p>
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

export default CommunityDescriptionPrograms;