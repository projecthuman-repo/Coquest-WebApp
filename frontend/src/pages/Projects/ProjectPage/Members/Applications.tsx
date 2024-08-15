import React, { useState, useContext, useEffect } from "react";
import { Typography } from "@mui/material";
import { styled } from "@mui/system";
import BackButton from "../../../../components/Buttons/BackButton";
import ApplicantCard from "../../../../components/ApplicantCard/ApplicantCard";
import { RoleApplicant } from "../../../../models/roleModel";
import { ProjectContext } from "../ProjectContext";
import { ProjectRole } from "../../../../models/roleModel";

const Container = styled("div")({
	display: "flex",
	margin: "auto",
	marginTop: 40,
	width: "70%",
	alignItems: "center",
	justifyContent: "center",
	flexDirection: "column",
});

const TitleField = styled(Typography)(({ theme }) => ({
	marginTop: 5,
	fontWeight: 650,
	fontSize: 48,
	textAlign: "center",
	[theme.breakpoints.down("md")]: {
		fontSize: 32,
	},
	[theme.breakpoints.down("sm")]: {
		fontSize: 26,
	},
}));

const Spacer = styled("div")({
	width: "100%",
	height: 26,
});

const Header = styled("div")(({ theme }) => ({
	width: "100%",
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
	[theme.breakpoints.down("sm")]: {
		flexDirection: "column",
	},
}));

const BackButtonContainer = styled("div")({
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-start",
	width: "100%",
	marginBottom: 20,
});

const Applications = () => {
	const { project } = useContext(ProjectContext);
	const [role, setRole] = useState<ProjectRole | null>(null);

	function goBack() {
		window.history.go(-1);
		return false;
	}

	useEffect(() => {
		if (role === null) {
			const path = window.location.pathname;
			const segments = path.split("/");
			const index = segments.indexOf("members");
			if (index !== -1 && segments[index + 1]) {
				const roleId = parseInt(segments[index + 1], 10);
				if (!isNaN(roleId) && project && project.openRoles) {
					const role = project.openRoles.find(
						(role) => role.id === roleId,
					);
					if (role) {
						setRole(role);
					}
				}
			}
		}
	}, [project, role]);

	return (
		<Container>
			<BackButtonContainer>
				<BackButton onClick={goBack} />
			</BackButtonContainer>
			{role && (
				<Header>
					<TitleField>{role.title}</TitleField>
				</Header>
			)}
			<Spacer />
			{role ? (
				role.applicants && role.applicants.length > 0 ? (
					role.applicants.map(
						(applicant: RoleApplicant, index: number) => (
							<ApplicantCard applicant={applicant} key={index} />
						),
					)
				) : (
					<div style={{ textAlign: "center" }}>No applicants yet</div>
				)
			) : (
				<div style={{ textAlign: "center" }}>No role found</div>
			)}
		</Container>
	);
};

export default Applications;
