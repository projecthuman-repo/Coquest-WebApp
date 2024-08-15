import React, { useState, useContext, useEffect } from "react";
import ProgramRoleCard from "../../components/RoleCard/ProgramRoleCard";
import { ProgramContext } from "../ProgramContext";

function OpenRoles() {
	const { program } = useContext(ProgramContext);
	const [roles, setRoles] = useState(program?.openRoles);

	useEffect(() => {
		setRoles(program?.openRoles);
	}, [program]);

	return (
		<div className="program-roles">
			{roles && roles.length > 0 ? (
				roles.map((role: any, index: number) => (
					<ProgramRoleCard
						key={index}
						id={role?.id}
						title={role?.title}
						program={role?.program}
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
