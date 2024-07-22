import React from "react";
import "./Milestones.css";
import "../Description.css";
import ProgramProgressBar from "../../../../components/ProgramProgressBar/ProgramProgressBar";

function ProjectsMilestones() {
	return (
		<>
			<div className="prj-m-pb-container">
				<ProgramProgressBar seeHistory={false} />
			</div>
			<div className="prj-m-container">
				<div className="prj-m-heading-container">
					<h2 className="prj-m-heading">Milestones</h2>
					<button className="prj-m-button-design">
						Add New Milestone
					</button>
				</div>
				<div className="prj-m-container margin-top">
					<div className="prj-m-background">
						<p className="prj-m-sub-heading">Program Name</p>
						<p className="prj-m-heading">Milestone</p>
						<p className="prj-m-text">Placeholder Description.</p>
						<button>
							<img
								src="/icons/expand-button-chevron.png"
								alt="expand-button"
							/>
						</button>
					</div>
				</div>
				<div className="prj-m-container margin-top">
					<div className="prj-m-background">
						<p className="prj-m-sub-heading">Program Name</p>
						<p className="prj-m-heading">Milestone</p>
						<p className="prj-m-text">
							Placeholder Description Expanded.
						</p>
						<p className="prj-m-text">
							<b>Completed By:</b> N/A
						</p>
						<p className="prj-m-sub-text">
							<b>Date Started:</b> N/A
						</p>
						<p className="prj-m-sub-text">
							<b>Date Completed:</b> N/A
						</p>
						<button>
							<img
								src="/icons/collapse-button-chevron.png"
								alt="collapse-button"
							/>
						</button>
					</div>
				</div>
			</div>
		</>
	);
}

export default ProjectsMilestones;
