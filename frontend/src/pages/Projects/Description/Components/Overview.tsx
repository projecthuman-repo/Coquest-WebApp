import React from "react";
import SharedCalendar from "../../../../components/SharedCalendar/SharedCalendar";
import Quests from "../../../../components/Quests/Quests";
import Members from "../../../../components/Members/index";
import ProgramProgressBar from "../../../../components/ProgramProgressBar/ProgramProgressBar";
import Budget from "../../../../components/Budget/Budget";
import Funding from "../../../../components/Funding/Funding";
import "./Overview.css";
import "../Description.css";

function ProjectsOverview() {

	return (
        <>
		<div className="prj-o-widget-container">
			<div className="prj-o-left">
				{/* Description, Objective and Initiative */}
				<div className="prj-o-background">
					<div className="prj-o-heading-container">
						<h2 className="prj-o-sub-heading">Description</h2>
						<a href="/" className="prj-o-link">Edit</a>
					</div>
					<p className="prj-o-sub-text margin-top margin-bottom">N/A</p>
					<h2 className="prj-o-sub-heading margin-bottom">Objective</h2>
					<p className="prj-o-sub-text margin-bottom">N/A</p>
					<h2 className="prj-o-sub-heading margin-bottom">Initiative</h2>
					<p className="prj-o-sub-text margin-bottom">N/A</p>
				</div>
				{/* Members */}
				<div className="prj-o-background">
					<h2 className="prj-o-sub-heading margin-bottom">Members</h2>
					<Members
						users={["Test"]}
						userRole={["Role"]}
						showAllLink="#"
					/>
				</div>
				{/* Progress */}
				<div className="prj-o-background">
					<ProgramProgressBar seeHistory={true} />
				</div>
				{/* Budget */}
				<div className="prj-o-background">
					<Budget />
				</div>
			</div>
			<div className="prj-o-right">
				{/* Program Information */}
				<div className="prj-o-background">
					<h2 className="prj-o-sub-heading margin-bottom">Project Information</h2>
					<p className="prj-o-sub-text"><b>Time: </b>N/A</p>
					<p className="prj-o-sub-text"><b>Date: </b>N/A</p>
					<p className="prj-o-sub-text"><b>Location: </b>N/A</p>
					<p className="prj-o-sub-text"><b>Spots Open: </b>N/A</p>
					<p className="prj-o-sub-text"><b>Cost: </b>N/A</p>
				</div>
				{/* Calendar */}
				<div className="prj-o-background">
					<h2 className="prj-o-sub-heading margin-bottom">Calendar</h2>
					<SharedCalendar />
				</div>
				{/* Quests */}
				<div className="prj-o-background">
					<Quests />
				</div>
				{/* Funding */}
				<div className="prj-o-background">
					<Funding />
				</div>
			</div>
		</div>
		</>
	);
}

export default ProjectsOverview;