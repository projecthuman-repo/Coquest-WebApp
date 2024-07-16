import React, { useState } from "react";
import "./Description.css";
import "./Projects.css";

function CommunityDescriptionProjects({ data }: { data: any }) {
	// Navigation Button Variable
	const [projectSection, setProjectSection] = useState("open-projects");

	return (
		<>
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
			<div className="quest-button-container">
				<button
					className={`quest-button-heading quest-button-design ${
						projectSection === "my-projects" ? "selected" : ""
					}`}
					onClick={() => setProjectSection("my-projects")}
				>
					My Projects
				</button>
				<button
					className={`quest-button-heading quest-button-design ${
						projectSection === "open-projects" ? "selected" : ""
					}`}
					onClick={() => setProjectSection("open-projects")}
				>
					Open Projects
				</button>
				<button
					className={`quest-button-heading quest-button-design ${
						projectSection === "completed-projects"
							? "selected"
							: ""
					}`}
					onClick={() => setProjectSection("completed-projects")}
				>
					Completed Projects
				</button>
			</div>
			<div className="project-container margin-top">
				<div className="project-background">
					<p className="project-heading">Project Name</p>
					<p className="project-sub-heading">Project Sub-Heading</p>
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

export default CommunityDescriptionProjects;
