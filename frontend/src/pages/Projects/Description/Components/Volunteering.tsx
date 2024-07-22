import React from "react";
import "./Volunteering.css";
import "../Description.css";

function ProjectsVolunteering() {

	return (
		<>
        <div className="prj-v-container">
			<div className="prj-v-heading-container">
				<h2 className="prj-v-heading">Volunteering</h2>
			</div>
			<div className="prj-v-container margin-top">
				<div className="prj-v-background">
					<p className="prj-v-sub-heading">Program Name</p>
					<p className="prj-v-heading">Position Title</p>
					<button>
						<img src="/icons/expand-button-chevron.png" alt="expand-button" />
					</button>
				</div>
			</div>
			<div className="prj-v-container margin-top">
				<div className="prj-v-background">
					<p className="prj-v-sub-heading">Program Name</p>
					<p className="prj-v-heading">Position Title</p>
					<p className="prj-v-text"><b>Responsibilities</b></p>
					<p className="prj-v-text">Placeholder Responsibilities.</p>
					<p className="prj-v-text"><b>Skills and Certificates</b></p>
					<p className="prj-v-text">N/A</p>
					<button>Apply</button>
					<button>
						<img src="/icons/collapse-button-chevron.png" alt="collapse-button" />
					</button>
				</div>
			</div>
		</div>
		</>
	);
}

export default ProjectsVolunteering;