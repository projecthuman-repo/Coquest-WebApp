import React, { useContext } from "react";
import VolunteerPositionCard from "../components/VolunteerPositionCard";
import { ProgramContext } from "./ProgramContext";
import "./Volunteering.css";
import "./index.css";

function ProgramsVolunteering() {
	const { program } = useContext(ProgramContext);

	return (
		<>
			<div className="prg-v-container">
				<div className="prg-v-heading-container">
					<h2 className="prg-v-heading">Volunteering</h2>
				</div>

				{program?.volunteerPositions.map((volunteerPosition, index) => (
					<VolunteerPositionCard
						key={index}
						id={volunteerPosition.id}
						title={volunteerPosition.title}
						responsibilities={volunteerPosition.responsibilities}
						skills={volunteerPosition.skills}
					/>
				))}
			</div>
		</>
	);
}

export default ProgramsVolunteering;
