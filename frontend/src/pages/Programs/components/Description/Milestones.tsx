import React from "react";
import "./Milestones.css";
import "../../Description/Description.css";
import ProgramProgressBar from "../../../../components/ProgramProgressBar/ProgramProgressBar";

function ProgramsMilestones() {
	return (
		<>
			<div className="prg-m-pb-container">
				<ProgramProgressBar seeHistory={false} />
			</div>
			<div className="prg-m-container">
				<div className="prg-m-heading-container">
					<h2 className="prg-m-heading">Milestones</h2>
					<button className="prg-m-button-design">
						Add New Milestone
					</button>
				</div>
				<div className="prg-m-container margin-top">
					<div className="prg-m-background">
						<p className="prg-m-sub-heading">Program Name</p>
						<p className="prg-m-heading">Milestone</p>
						<p className="prg-m-text">Placeholder Description.</p>
						<button>
							<img
								src="/icons/expand-button-chevron.png"
								alt="expand-button"
							/>
						</button>
					</div>
				</div>
				<div className="prg-m-container margin-top">
					<div className="prg-m-background">
						<p className="prg-m-sub-heading">Program Name</p>
						<p className="prg-m-heading">Milestone</p>
						<p className="prg-m-text">
							Placeholder Description Expanded.
						</p>
						<p className="prg-m-text">
							<b>Completed By:</b> N/A
						</p>
						<p className="prg-m-sub-text">
							<b>Date Started:</b> N/A
						</p>
						<p className="prg-m-sub-text">
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

export default ProgramsMilestones;
