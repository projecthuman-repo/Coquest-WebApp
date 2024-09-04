import React, { useState } from "react";
import "./index.css";
import "./Projects.css";

function CommunityDescriptionProjects() {
	// Navigation Button Variable
	const [projectSection, setProjectSection] = useState("open-projects");

	return (
		<>
			<div className="com-prj-search-container">
				<input
					type="search"
					className="com-prj-search"
					name="search"
					placeholder="Search Nearby"
				/>
				<img
					src="https://cdn1.iconfinder.com/data/icons/hawcons/32/698627-icon-111-search-512.png"
					alt="search-icon"
					className="com-prj-search-icon"
				/>
			</div>
			<div className="quest-button-container">
				<button
					className={`quest-button-heading quest-button-design ${
						projectSection === "my-projects" ? "com-d-selected" : ""
					}`}
					onClick={() => setProjectSection("my-projects")}
				>
					My Projects
				</button>
				<button
					className={`quest-button-heading quest-button-design ${
						projectSection === "open-projects"
							? "com-d-selected"
							: ""
					}`}
					onClick={() => setProjectSection("open-projects")}
				>
					Open Projects
				</button>
				<button
					className={`quest-button-heading quest-button-design ${
						projectSection === "completed-projects"
							? "com-d-selected"
							: ""
					}`}
					onClick={() => setProjectSection("completed-projects")}
				>
					Completed Projects
				</button>
			</div>
			<div className="com-prj-container margin-top">
				<div className="com-prj-background">
					<p className="com-prj-heading">Project Name</p>
					<p className="com-prj-sub-heading">Project Sub-Heading</p>
					<p className="com-prj-sub-heading">Location: N/A</p>
					<p className="com-prj-text">Placeholder Description.</p>
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

export default CommunityDescriptionProjects;
