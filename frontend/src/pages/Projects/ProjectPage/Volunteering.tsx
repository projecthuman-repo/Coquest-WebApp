import React, { useContext } from "react";
import VolunteerPositionCard from "@/pages/Programs/components/VolunteerPositionCard/VolunteerPositionCard";
import { ProjectContext } from "./ProjectContext";
import "./Volunteering.css";
import "./index.css";

function ProjectVolunteering() {
	const { project } = useContext(ProjectContext);

	return (
		<>
			<div className="prg-v-container">
				<div className="prg-v-heading-container">
					<h2 className="prg-v-heading">Volunteering</h2>
				</div>

				<div className="volunteering-positions">
					{project?.volunteerPositions?.map(
						(volunteerPosition, index) => (
							<VolunteerPositionCard
								key={index}
								id={volunteerPosition.id}
								title={volunteerPosition.title}
								responsibilities={
									volunteerPosition.responsibilities
								}
								skills={volunteerPosition.skills}
							/>
						),
					)}
				</div>
			</div>
		</>
	);
}

export default ProjectVolunteering;
