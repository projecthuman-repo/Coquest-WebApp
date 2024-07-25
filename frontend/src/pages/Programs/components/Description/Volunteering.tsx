import React from "react";
import "./Volunteering.css";
import "../../Description/Description.css";

function ProgramsVolunteering() {
	return (
		<>
			<div className="prg-v-container">
				<div className="prg-v-heading-container">
					<h2 className="prg-v-heading">Volunteering</h2>
				</div>
				<div className="prg-v-container margin-top">
					<div className="prg-v-background">
						<p className="prg-v-sub-heading">Program Name</p>
						<p className="prg-v-heading">Position Title</p>
						<button>
							<img
								src="/icons/expand-button-chevron.png"
								alt="expand-button"
							/>
						</button>
					</div>
				</div>
				<div className="prg-v-container margin-top">
					<div className="prg-v-background">
						<p className="prg-v-sub-heading">Program Name</p>
						<p className="prg-v-heading">Position Title</p>
						<p className="prg-v-text">
							<b>Responsibilities</b>
						</p>
						<p className="prg-v-text">
							Placeholder Responsibilities.
						</p>
						<p className="prg-v-text">
							<b>Skills and Certificates</b>
						</p>
						<p className="prg-v-text">N/A</p>
						<button>Apply</button>
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

export default ProgramsVolunteering;
