import React from "react";
import SharedCalendar from "../../../../components/SharedCalendar/SharedCalendar";
import Quests from "../../../../components/Quests/Quests";
import Members from "../../../../components/Members/index";
import ProgramProgressBar from "../../../../components/ProgramProgressBar/ProgramProgressBar";
import Budget from "../../../../components/Budget/Budget";
import Funding from "../../../../components/Funding/Funding";
import "./Overview.css";
import "../Description.css";

function ProgramsOverview() {

	return (
        <>
		<div className="prg-o-widget-container">
			<div className="prg-o-left">
				{/* Description, Objective and Initiative */}
				<div className="prg-o-background">
					<div className="prg-o-heading-container">
						<h2 className="prg-o-sub-heading">Description</h2>
						<a href="/" className="prg-o-link">Edit</a>
					</div>
					<p className="prg-o-sub-text margin-top margin-bottom">N/A</p>
					<h2 className="prg-o-sub-heading margin-bottom">Objective</h2>
					<p className="prg-o-sub-text margin-bottom">N/A</p>
					<h2 className="prg-o-sub-heading margin-bottom">Initiative</h2>
					<p className="prg-o-sub-text margin-bottom">N/A</p>
				</div>
				{/* Members */}
				<div className="prg-o-background">
					<h2 className="prg-o-sub-heading margin-bottom">Members</h2>
					<Members
						users={["Test"]}
						userRole={["Role"]}
						showAllLink="#"
					/>
				</div>
				{/* Progress */}
				<div className="prg-o-background">
					<ProgramProgressBar seeHistory={true} />
				</div>
				{/* Budget */}
				<div className="prg-o-background">
					<Budget />
				</div>
			</div>
			<div className="prg-o-right">
				{/* Program Information */}
				<div className="prg-o-background">
					<h2 className="prg-o-sub-heading margin-bottom">Program Information</h2>
					<p className="prg-o-sub-text"><b>Time: </b>N/A</p>
					<p className="prg-o-sub-text"><b>Date: </b>N/A</p>
					<p className="prg-o-sub-text"><b>Location: </b>N/A</p>
					<p className="prg-o-sub-text"><b>Spots Open: </b>N/A</p>
					<p className="prg-o-sub-text"><b>Cost: </b>N/A</p>
				</div>
				{/* Calendar */}
				<div className="prg-o-background">
					<h2 className="prg-o-sub-heading margin-bottom">Calendar</h2>
					<SharedCalendar />
				</div>
				{/* Quests */}
				<div className="prg-o-background">
					<Quests />
				</div>
				{/* Funding */}
				<div className="prg-o-background">
					<Funding />
				</div>
			</div>
		</div>
		</>
	);
}

export default ProgramsOverview;