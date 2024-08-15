import React, { useState, useContext, useEffect } from "react";
import ProjectRoleCard from "../../../Programs/components/RoleCard/ProjectRoleCard";
import { ProjectContext } from "../ProjectContext";

function OpenRoles() {
	const { project } = useContext(ProjectContext);
	const [roles, setRoles] = useState(project?.openRoles);

	useEffect(() => {
		setRoles(project?.openRoles);
	}, [project]);

	return (
		<div className="project-roles">
			{roles && roles.length > 0 ? (
				roles.map((role: any, index: number) => (
					<ProjectRoleCard
						key={index}
						id={role?.id}
						title={role?.title}
						project={role?.project}
						location={role?.location}
						description={role?.description}
						qualifications={role?.qualifications}
						datePosted={role?.datePosted}
						salary={role?.salary}
						applicants={role?.applicants}
					/>
				))
			) : (
				<div style={{ textAlign: "center" }}>No roles available</div>
			)}
		</div>
	);
}

export default OpenRoles;
