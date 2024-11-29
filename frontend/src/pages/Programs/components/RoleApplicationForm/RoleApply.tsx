import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Input from "@/components/Input";
import { styled } from "@mui/system";
import OutlineButton from "@/components/Buttons/OutlineButton";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import BackButton from "@/components/Buttons/BackButton";
import {
	ProgramRole,
	ProjectRole,
	RoleApplicant,
	Education,
	Experience,
	Certification,
	DayAvailability,
	PreviousProject,
	Badge,
	Reference,
} from "@/models/roleModel";
import { ProgramContext } from "@/pages/Programs/ProgramPage/ProgramContext";
import { ProjectContext } from "@/pages/Projects/ProjectPage/ProjectContext";
import { CoopContext } from "@/pages/Coop/CoopPage/CoopContext";
import "./RoleApply.css";

const Container = styled("div")({
	display: "flex",
	margin: "auto",
	marginTop: 40,
	width: "70%",
	alignItems: "center",
	justifyContent: "center",
	flexDirection: "column",
});

const BackButtonContainer = styled("div")({
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-start",
	width: "100%",
	marginBottom: 20,
});

interface RoleApplyProps {
	type: string; // "program" or "project"
}

type Role = ProgramRole | ProjectRole;
function isProgramRole(role: Role): role is ProgramRole {
	return (role as ProgramRole).program !== undefined;
}

function RoleApply({ type }: RoleApplyProps) {
	const { program, updateProgram } = useContext(ProgramContext);
	const { project, updateProject } = useContext(ProjectContext);
	const { coop, updateCoop } = useContext(CoopContext);
	const [role, setRole] = useState<Role | null>(null);
	const [readyForSubmit, setReadyForSubmit] = useState(false);
	const [name, setName] = useState("");
	const [companyName, setCompanyName] = useState("");
	const [address, setAddress] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [educations, setEducations] = useState<Education[] | null>(null);
	const [experiences, setExperiences] = useState<Experience[] | null>(null);
	const [certifications, setCertifications] = useState<
		Certification[] | null
	>(null);
	const [availabilities, setAvailabilities] = useState<DayAvailability[]>([
		{ day: "Monday", from: "", to: "" },
		{ day: "Tuesday", from: "", to: "" },
		{ day: "Wednesday", from: "", to: "" },
		{ day: "Thursday", from: "", to: "" },
		{ day: "Friday", from: "", to: "" },
	]);
	const [previousProjects, setPreviousProjects] = useState<
		PreviousProject[] | null
	>(null);
	const [badges, setBadges] = useState<Badge[] | null>(null);
	const [references, setReferences] = useState<Reference[] | null>(null);
	const [educationExpanded, setEducationExpanded] = useState(true);
	const [experienceExpanded, setExperienceExpanded] = useState(true);
	const [certificationExpanded, setCertificationExpanded] = useState(true);
	const [previousProjectsExpanded, setPreviousProjectsExpanded] =
		useState(true);
	const [badgesExpanded, setBadgesExpanded] = useState(true);
	const [referencesExpanded, setReferencesExpanded] = useState(true);

	const navigate = useNavigate();

	function addEducation() {
		if (educations === null) {
			setEducations([
				{
					title: "",
					description: "",
					startDate: "",
					endDate: "",
					completionStatus: false,
				},
			]);
			return;
		}
		setEducations([
			...educations,
			{
				title: "",
				description: "",
				startDate: "",
				endDate: "",
				completionStatus: false,
			},
		]);
	}

	function deleteEducation(index: number) {
		if (educations !== null) {
			setEducations(educations?.filter((_, i) => i !== index));
			if (educations?.length === 0) {
				setEducations(null);
			}
		}
	}

	function addExperience() {
		if (experiences === null) {
			setExperiences([
				{ title: "", description: "", startDate: "", endDate: "" },
			]);
			return;
		}
		setExperiences([
			...experiences,
			{ title: "", description: "", startDate: "", endDate: "" },
		]);
	}

	function deleteExperience(index: number) {
		if (experiences !== null) {
			setExperiences(experiences?.filter((_, i) => i !== index));
			if (experiences?.length === 0) {
				setExperiences(null);
			}
		}
	}

	function addCertification() {
		if (certifications === null) {
			setCertifications([{ title: "", description: "", issueDate: "" }]);
			return;
		}
		setCertifications([
			...certifications,
			{ title: "", description: "", issueDate: "" },
		]);
	}

	function deleteCertification(index: number) {
		if (certifications !== null) {
			setCertifications(certifications?.filter((_, i) => i !== index));
			if (certifications?.length === 0) {
				setCertifications(null);
			}
		}
	}

	function addPreviousProject() {
		if (previousProjects === null) {
			setPreviousProjects([
				{ title: "", description: "", startDate: "", endDate: "" },
			]);
			return;
		}
		setPreviousProjects([
			...previousProjects,
			{ title: "", description: "", startDate: "", endDate: "" },
		]);
	}

	function deletePreviousProject(index: number) {
		if (previousProjects !== null) {
			setPreviousProjects(
				previousProjects?.filter((_, i) => i !== index),
			);
			if (previousProjects?.length === 0) {
				setPreviousProjects(null);
			}
		}
	}

	function addBadge() {
		if (badges === null) {
			setBadges([{ title: "", description: "" }]);
			return;
		}
		setBadges([...badges, { title: "", description: "" }]);
	}

	function deleteBadge(index: number) {
		if (badges !== null) {
			setBadges(badges?.filter((_, i) => i !== index));
			if (badges?.length === 0) {
				setBadges(null);
			}
		}
	}

	function addReference() {
		if (references === null) {
			setReferences([
				{ name: "", companyName: "", phone: "", email: "" },
			]);
			return;
		}
		setReferences([
			...references,
			{ name: "", companyName: "", phone: "", email: "" },
		]);
	}

	function deleteReference(index: number) {
		if (references !== null) {
			setReferences(references?.filter((_, i) => i !== index));
			if (references?.length === 0) {
				setReferences(null);
			}
		}
	}

	function handleApplication() {
		if (readyForSubmit && role) {
			// clean educations to have only fully filled ones
			let cleanedEducations = null;
			if (educations) {
				cleanedEducations = educations?.filter(
					(education) =>
						education.title !== "" &&
						education.description !== "" &&
						education.startDate !== "",
				);
				if (
					cleanedEducations === undefined ||
					cleanedEducations.length === 0
				) {
					cleanedEducations = null;
				}
			}

			// clean experiences to have only fully filled ones
			let cleanedExperiences = null;
			if (experiences) {
				cleanedExperiences = experiences?.filter(
					(experience) =>
						experience.title !== "" &&
						experience.description !== "" &&
						experience.startDate !== "",
				);
				if (
					cleanedExperiences === undefined ||
					cleanedExperiences.length === 0
				) {
					cleanedExperiences = null;
				}
			}

			// clean certifications to have only fully filled ones
			let cleanedCertifications = null;
			if (certifications) {
				cleanedCertifications = certifications?.filter(
					(certification) =>
						certification.title !== "" &&
						certification.description !== "" &&
						certification.issueDate !== "",
				);
				if (
					cleanedCertifications === undefined ||
					cleanedCertifications.length === 0
				) {
					cleanedCertifications = null;
				}
			}

			// clean availabilities to have only filled days
			const cleanedAvailabilities = availabilities.filter(
				(availability) =>
					availability.from !== "" && availability.to !== "",
			);

			// clean previous projects to have only fully filled ones
			let cleanedPreviousProjects = null;
			if (previousProjects) {
				cleanedPreviousProjects = previousProjects?.filter(
					(previousProject) =>
						previousProject.title !== "" &&
						previousProject.description !== "" &&
						previousProject.startDate !== "",
				);
				if (
					cleanedPreviousProjects === undefined ||
					cleanedPreviousProjects.length === 0
				) {
					cleanedPreviousProjects = null;
				}
			}

			// clean badges to have only fully filled ones
			let cleanedBadges = null;
			if (badges) {
				cleanedBadges = badges?.filter(
					(badge) => badge.title !== "" && badge.description !== "",
				);
				if (cleanedBadges.length === 0) {
					cleanedBadges = null;
				}
			}

			// clean references to have only fully filled ones
			let cleanedReferences = null;
			if (references) {
				cleanedReferences = references?.filter(
					(reference) =>
						reference.name !== "" &&
						reference.companyName !== "" &&
						reference.phone !== "" &&
						reference.email !== "",
				);
				if (cleanedReferences.length === 0) {
					cleanedReferences = null;
				}
			}

			const newApplicant: RoleApplicant = {
				id: `${role.applicants ? role.applicants?.length + 1 : 1}`,
				dateApplied: new Date().toISOString(),
				name: name,
				companyName: companyName,
				address: address,
				phone: phone,
				email: email,
				education: cleanedEducations,
				experience: cleanedExperiences,
				certifications: cleanedCertifications,
				availability: cleanedAvailabilities,
				previousProjects: cleanedPreviousProjects,
				badges: cleanedBadges,
				references: cleanedReferences,
			};

			if (type === "program") {
				if (program?.openRoles) {
					updateProgram({
						...program,
						openRoles: program.openRoles.map((openRole) =>
							openRole.id === role.id
								? {
										...openRole,
										applicants: openRole.applicants
											? [
													...openRole.applicants,
													newApplicant,
												]
											: [newApplicant],
									}
								: openRole,
						),
					});
				}

				// TODO: add new applicant to the program's role on backend

				// for testing purposes to see that the application is added to the role
				// navigate("/programs/" + program?.id + "/members/" + role.id + "/applications");

				navigate("/programs/" + program?._id);
			}

			if (type === "project") {
				if (project?.openRoles) {
					updateProject({
						...project,
						openRoles: project.openRoles.map((openRole) =>
							openRole.id === role.id
								? {
										...openRole,
										applicants: openRole.applicants
											? [
													...openRole.applicants,
													newApplicant,
												]
											: [newApplicant],
									}
								: openRole,
						),
					});
				}

				// TODO: add new applicant to the program's role on backend

				// for testing purposes to see that the application is added to the role
				// navigate("/programs/" + program?.id + "/members/" + role.id + "/applications");

				navigate("/projects/" + project?._id);
			}

			if (type === "coop") {
				if (coop?.openRoles) {
					updateCoop({
						...coop,
						openRoles: coop.openRoles.map((openRole) =>
							openRole.id === role.id
								? {
										...openRole,
										applicants: openRole.applicants
											? [
													...openRole.applicants,
													newApplicant,
												]
											: [newApplicant],
									}
								: openRole,
						),
					});
				}

				// TODO: add new applicant to the program's role on backend

				// for testing purposes to see that the application is added to the role
				// navigate("/programs/" + program?.id + "/members/" + role.id + "/applications");

				navigate("/coops/" + coop?._id);
			}
		}
	}

	function resetAvailabilities() {
		setAvailabilities([
			{ day: "Monday", from: "", to: "" },
			{ day: "Tuesday", from: "", to: "" },
			{ day: "Wednesday", from: "", to: "" },
			{ day: "Thursday", from: "", to: "" },
			{ day: "Friday", from: "", to: "" },
		]);
	}

	function goBack() {
		window.history.go(-1);
		return false;
	}

	useEffect(() => {
		// detect which role application is for
		if (role === null) {
			const path = window.location.pathname;
			const segments = path.split("/");
			const index = segments.indexOf("members");

			if (index !== -1 && segments[index + 1]) {
				const roleId = parseInt(segments[index + 1], 10);
				if (type === "program") {
					if (!isNaN(roleId) && program && program.openRoles) {
						const role = program.openRoles.find(
							(role) =>
								role.id?.localeCompare(roleId.toString()) === 0,
						);
						if (role) {
							setRole(role);
						}
					}
				}

				if (type === "project") {
					if (!isNaN(roleId) && project && project.openRoles) {
						const role = project.openRoles.find(
							(role) =>
								role.id?.localeCompare(roleId.toString()) === 0,
						);
						if (role) {
							setRole(role);
						}
					}
				}
			}
		}

		// detect if all required fields are filled
		let availabilitiesFilled = false;

		// At least one day must be filled
		for (let i = 0; i < availabilities.length; i++) {
			if (availabilities[i].from !== "" && availabilities[i].to !== "") {
				availabilitiesFilled = true;
				break;
			}
		}

		if (
			availabilitiesFilled &&
			name &&
			companyName &&
			address &&
			phone &&
			email
		) {
			setReadyForSubmit(true);
		} else {
			setReadyForSubmit(false);
		}
	}, [
		program,
		project,
		role,
		name,
		companyName,
		address,
		phone,
		email,
		availabilities,
		type,
	]);

	return (
		<Container>
			<BackButtonContainer>
				<BackButton onClick={goBack} />
			</BackButtonContainer>
			{role ? (
				<>
					<div className="role-apply-container">
						<div className="role-apply-header">
							<p className="role-apply-title">{role.title}</p>
							{isProgramRole(role) ? (
								<p>{role.program}</p>
							) : (
								<p>{role.project}</p>
							)}
							<p>{role.location}</p>
						</div>

						<div className="role-apply-general-info">
							<Input label="Name of applicant">
								<input
									type="text"
									placeholder=""
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							</Input>

							<Input label="Company name">
								<input
									type="text"
									placeholder=""
									value={companyName}
									onChange={(e) =>
										setCompanyName(e.target.value)
									}
								/>
							</Input>

							<Input label="Address">
								<input
									type="text"
									placeholder=""
									value={address}
									onChange={(e) => setAddress(e.target.value)}
								/>
							</Input>

							<Input label="Phone number">
								<input
									type="text"
									placeholder=""
									value={phone}
									onChange={(e) => setPhone(e.target.value)}
								/>
							</Input>

							<Input label="Email">
								<input
									type="email"
									placeholder=""
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</Input>
						</div>

						<div
							className={
								educationExpanded ? "" : "collapsed-box-shadow"
							}
						>
							<div className="section-header">
								<p className="section-title">Education</p>
								<button
									onClick={() =>
										setEducationExpanded(!educationExpanded)
									}
								>
									{educationExpanded ? "Collapse" : "Expand"}
								</button>
							</div>
							{educationExpanded &&
								educations &&
								educations.map((education, index) => (
									<div
										key={index}
										className="role-apply-form"
									>
										<Input label="Education name">
											<input
												type="text"
												placeholder=""
												value={education.title}
												onChange={(e) =>
													setEducations([
														...educations.slice(
															0,
															index,
														),
														{
															...education,
															title: e.target
																.value,
														},
														...educations.slice(
															index + 1,
														),
													])
												}
											/>
										</Input>

										<Input label="Short description">
											<textarea
												rows={3}
												placeholder=""
												className="role-apply-desc"
												value={education.description}
												onChange={(e) =>
													setEducations([
														...educations.slice(
															0,
															index,
														),
														{
															...education,
															description:
																e.target.value,
														},
														...educations.slice(
															index + 1,
														),
													])
												}
												maxLength={300} // TODO: update this with Coquest role education description character limit
											></textarea>
										</Input>

										<div className="role-apply-dates">
											<div>
												<label htmlFor="start-date">
													Start Date
												</label>
												<input
													type="date"
													placeholder="Start Date"
													className="start-date"
													name="start-date"
													value={education.startDate}
													onChange={(e) =>
														setEducations([
															...educations.slice(
																0,
																index,
															),
															{
																...education,
																startDate:
																	e.target
																		.value,
															},
															...educations.slice(
																index + 1,
															),
														])
													}
												/>
											</div>

											<div>
												<label htmlFor="end-date">
													End Date
												</label>
												<input
													type="date"
													placeholder="End Date"
													className="end-date"
													name="end-date"
													value={
														education.endDate || ""
													}
													onChange={(e) =>
														setEducations([
															...educations.slice(
																0,
																index,
															),
															{
																...education,
																endDate:
																	e.target
																		.value,
															},
															...educations.slice(
																index + 1,
															),
														])
													}
												/>
											</div>
										</div>

										<div className="role-apply-form-footer">
											<div className="role-apply-completion">
												<input
													type="checkbox"
													name="completion-status"
													className="completion-status"
													checked={
														education.completionStatus
													}
													onChange={(e) =>
														setEducations([
															...educations.slice(
																0,
																index,
															),
															{
																...education,
																completionStatus:
																	e.target
																		.checked,
															},
															...educations.slice(
																index + 1,
															),
														])
													}
												/>
												<label htmlFor="completion-status">
													I completed this education.
												</label>
											</div>
											<img
												src="/icons/delete.png"
												alt="delete"
												className="role-apply-icon"
												onClick={() =>
													deleteEducation(index)
												}
											/>
										</div>
									</div>
								))}
							{educationExpanded && (
								<div className="role-apply-add-more">
									<OutlineButton
										name="Add More"
										onClick={addEducation}
									/>
								</div>
							)}
						</div>

						<div
							className={
								experienceExpanded ? "" : "collapsed-box-shadow"
							}
						>
							<div className="section-header">
								<p className="section-title">Work Experience</p>
								<button
									onClick={() =>
										setExperienceExpanded(
											!experienceExpanded,
										)
									}
								>
									{experienceExpanded ? "Collapse" : "Expand"}
								</button>
							</div>
							{experienceExpanded &&
								experiences &&
								experiences.map((experience, index) => (
									<div
										key={index}
										className="role-apply-form"
									>
										<Input label="Experience name">
											<input
												type="text"
												placeholder=""
												value={experience.title}
												onChange={(e) =>
													setExperiences([
														...experiences.slice(
															0,
															index,
														),
														{
															...experience,
															title: e.target
																.value,
														},
														...experiences.slice(
															index + 1,
														),
													])
												}
											/>
										</Input>

										<Input label="Short description">
											<textarea
												rows={3}
												placeholder=""
												className="role-apply-desc"
												value={experience.description}
												onChange={(e) =>
													setExperiences([
														...experiences.slice(
															0,
															index,
														),
														{
															...experience,
															description:
																e.target.value,
														},
														...experiences.slice(
															index + 1,
														),
													])
												}
												maxLength={300} // TODO: update this with Coquest role experience description character limit
											></textarea>
										</Input>

										<div className="role-apply-form-footer">
											<div className="role-apply-dates">
												<div>
													<label htmlFor="start-date">
														Start Date
													</label>
													<input
														type="date"
														placeholder="Start Date"
														className="start-date"
														name="start-date"
														value={
															experience.startDate
														}
														onChange={(e) =>
															setExperiences([
																...experiences.slice(
																	0,
																	index,
																),
																{
																	...experience,
																	startDate:
																		e.target
																			.value,
																},
																...experiences.slice(
																	index + 1,
																),
															])
														}
													/>
												</div>

												<div>
													<label htmlFor="end-date">
														End Date
													</label>
													<input
														type="date"
														placeholder="End Date"
														className="end-date"
														name="end-date"
														value={
															experience.endDate ||
															""
														}
														onChange={(e) =>
															setExperiences([
																...experiences.slice(
																	0,
																	index,
																),
																{
																	...experience,
																	endDate:
																		e.target
																			.value,
																},
																...experiences.slice(
																	index + 1,
																),
															])
														}
													/>
												</div>
											</div>
											<img
												src="/icons/delete.png"
												alt="delete"
												className="role-apply-icon"
												onClick={() =>
													deleteExperience(index)
												}
											/>
										</div>
									</div>
								))}
							{experienceExpanded && (
								<div className="role-apply-add-more">
									<OutlineButton
										name="Add More"
										onClick={addExperience}
									/>
								</div>
							)}
						</div>

						<div
							className={
								certificationExpanded
									? ""
									: "collapsed-box-shadow"
							}
						>
							<div className="section-header">
								<p className="section-title">Certifications</p>
								<button
									onClick={() =>
										setCertificationExpanded(
											!certificationExpanded,
										)
									}
								>
									{certificationExpanded
										? "Collapse"
										: "Expand"}
								</button>
							</div>
							{certificationExpanded &&
								certifications &&
								certifications.map((certification, index) => (
									<div
										key={index}
										className="role-apply-form"
									>
										<Input label="Certification name">
											<input
												type="text"
												placeholder=""
												value={certification.title}
												onChange={(e) =>
													setCertifications([
														...certifications.slice(
															0,
															index,
														),
														{
															...certification,
															title: e.target
																.value,
														},
														...certifications.slice(
															index + 1,
														),
													])
												}
											/>
										</Input>

										<Input label="Short description">
											<textarea
												rows={3}
												placeholder=""
												className="role-apply-desc"
												value={
													certification.description
												}
												onChange={(e) =>
													setCertifications([
														...certifications.slice(
															0,
															index,
														),
														{
															...certification,
															description:
																e.target.value,
														},
														...certifications.slice(
															index + 1,
														),
													])
												}
												maxLength={300} // TODO: update this with Coquest role certification description character limit
											></textarea>
										</Input>

										<div className="role-apply-form-footer">
											<div className="role-apply-dates">
												<div>
													<label htmlFor="issue-date">
														Issue Date
													</label>
													<input
														type="date"
														placeholder="Start Date"
														className="issue-date"
														name="issue-date"
														value={
															certification.issueDate
														}
														onChange={(e) =>
															setCertifications([
																...certifications.slice(
																	0,
																	index,
																),
																{
																	...certification,
																	issueDate:
																		e.target
																			.value,
																},
																...certifications.slice(
																	index + 1,
																),
															])
														}
													/>
												</div>
											</div>
											<img
												src="/icons/delete.png"
												alt="delete"
												className="role-apply-icon"
												onClick={() =>
													deleteCertification(index)
												}
											/>
										</div>
									</div>
								))}
							{certificationExpanded && (
								<div className="role-apply-add-more">
									<OutlineButton
										name="Add More"
										onClick={addCertification}
									/>
								</div>
							)}
						</div>

						<div
							className={
								previousProjectsExpanded
									? ""
									: "collapsed-box-shadow"
							}
						>
							<div className="section-header">
								<p className="section-title">
									Previous Projects
								</p>
								<button
									onClick={() =>
										setPreviousProjectsExpanded(
											!previousProjectsExpanded,
										)
									}
								>
									{previousProjectsExpanded
										? "Collapse"
										: "Expand"}
								</button>
							</div>
							{previousProjectsExpanded &&
								previousProjects &&
								previousProjects.map(
									(previousProject, index) => (
										<div
											key={index}
											className="role-apply-form"
										>
											<Input label="Project name">
												<input
													type="text"
													placeholder=""
													value={
														previousProject.title
													}
													onChange={(e) =>
														setPreviousProjects([
															...previousProjects.slice(
																0,
																index,
															),
															{
																...previousProject,
																title: e.target
																	.value,
															},
															...previousProjects.slice(
																index + 1,
															),
														])
													}
												/>
											</Input>

											<Input label="Short description">
												<textarea
													rows={3}
													placeholder=""
													className="role-apply-desc"
													value={
														previousProject.description
													}
													onChange={(e) =>
														setPreviousProjects([
															...previousProjects.slice(
																0,
																index,
															),
															{
																...previousProject,
																description:
																	e.target
																		.value,
															},
															...previousProjects.slice(
																index + 1,
															),
														])
													}
													maxLength={300} // TODO: update this with Coquest role project description character limit
												></textarea>
											</Input>

											<div className="role-apply-form-footer">
												<div className="role-apply-dates">
													<div>
														<label htmlFor="start-date">
															Start Date
														</label>
														<input
															type="date"
															placeholder="Start Date"
															className="start-date"
															name="start-date"
															value={
																previousProject.startDate
															}
															onChange={(e) =>
																setPreviousProjects(
																	[
																		...previousProjects.slice(
																			0,
																			index,
																		),
																		{
																			...previousProject,
																			startDate:
																				e
																					.target
																					.value,
																		},
																		...previousProjects.slice(
																			index +
																				1,
																		),
																	],
																)
															}
														/>
													</div>

													<div>
														<label htmlFor="end-date">
															End Date
														</label>
														<input
															type="date"
															placeholder="End Date"
															className="end-date"
															name="end-date"
															value={
																previousProject.endDate ||
																""
															}
															onChange={(e) =>
																setPreviousProjects(
																	[
																		...previousProjects.slice(
																			0,
																			index,
																		),
																		{
																			...previousProject,
																			endDate:
																				e
																					.target
																					.value,
																		},
																		...previousProjects.slice(
																			index +
																				1,
																		),
																	],
																)
															}
														/>
													</div>
												</div>
												<img
													src="/icons/delete.png"
													alt="delete"
													className="role-apply-icon"
													onClick={() =>
														deletePreviousProject(
															index,
														)
													}
												/>
											</div>
										</div>
									),
								)}
							{previousProjectsExpanded && (
								<div className="role-apply-add-more">
									<OutlineButton
										name="Add More"
										onClick={addPreviousProject}
									/>
								</div>
							)}
						</div>

						<div
							className={
								badgesExpanded ? "" : "collapsed-box-shadow"
							}
						>
							<div className="section-header">
								<p className="section-title">
									Badges and Awards
								</p>
								<button
									onClick={() =>
										setBadgesExpanded(!badgesExpanded)
									}
								>
									{badgesExpanded ? "Collapse" : "Expand"}
								</button>
							</div>
							{badgesExpanded &&
								badges &&
								badges.map((badge, index) => (
									<div
										key={index}
										className="role-apply-form"
									>
										<Input label="Badge name">
											<input
												type="text"
												placeholder=""
												value={badge.title}
												onChange={(e) =>
													setBadges([
														...badges.slice(
															0,
															index,
														),
														{
															...badge,
															title: e.target
																.value,
														},
														...badges.slice(
															index + 1,
														),
													])
												}
											/>
										</Input>

										<Input label="Short description">
											<textarea
												rows={3}
												placeholder=""
												className="role-apply-desc"
												value={badge.description}
												onChange={(e) =>
													setBadges([
														...badges.slice(
															0,
															index,
														),
														{
															...badge,
															description:
																e.target.value,
														},
														...badges.slice(
															index + 1,
														),
													])
												}
												maxLength={300} // TODO: update this with Coquest role badge description character limit
											></textarea>
										</Input>

										<div className="role-apply-form-footer-single-icon">
											<img
												src="/icons/delete.png"
												alt="delete"
												className="role-apply-icon"
												onClick={() =>
													deleteBadge(index)
												}
											/>
										</div>
									</div>
								))}
							{badgesExpanded && (
								<div className="role-apply-add-more">
									<OutlineButton
										name="Add More"
										onClick={addBadge}
									/>
								</div>
							)}
						</div>

						<div
							className={
								referencesExpanded ? "" : "collapsed-box-shadow"
							}
						>
							<div className="section-header">
								<p className="section-title">
									Personal References
								</p>
								<button
									onClick={() =>
										setReferencesExpanded(
											!referencesExpanded,
										)
									}
								>
									{referencesExpanded ? "Collapse" : "Expand"}
								</button>
							</div>
							{referencesExpanded &&
								references &&
								references.map((reference, index) => (
									<div
										key={index}
										className="role-apply-form"
									>
										<Input label="Reference name">
											<input
												type="text"
												placeholder=""
												value={reference.name}
												onChange={(e) =>
													setReferences([
														...references.slice(
															0,
															index,
														),
														{
															...reference,
															name: e.target
																.value,
														},
														...references.slice(
															index + 1,
														),
													])
												}
											/>
										</Input>

										<Input label="Company name">
											<input
												type="text"
												placeholder=""
												value={reference.companyName}
												onChange={(e) =>
													setReferences([
														...references.slice(
															0,
															index,
														),
														{
															...reference,
															companyName:
																e.target.value,
														},
														...references.slice(
															index + 1,
														),
													])
												}
											/>
										</Input>

										<Input label="Phone">
											<input
												type="text"
												placeholder=""
												value={reference.phone}
												onChange={(e) =>
													setReferences([
														...references.slice(
															0,
															index,
														),
														{
															...reference,
															phone: e.target
																.value,
														},
														...references.slice(
															index + 1,
														),
													])
												}
											/>
										</Input>

										<Input label="Email">
											<input
												type="text"
												placeholder=""
												value={reference.email}
												onChange={(e) =>
													setReferences([
														...references.slice(
															0,
															index,
														),
														{
															...reference,
															email: e.target
																.value,
														},
														...references.slice(
															index + 1,
														),
													])
												}
											/>
										</Input>

										<div className="role-apply-form-footer-single-icon">
											<img
												src="/icons/delete.png"
												alt="delete"
												className="role-apply-icon"
												onClick={() =>
													deleteReference(index)
												}
											/>
										</div>
									</div>
								))}
							{referencesExpanded && (
								<div className="role-apply-add-more">
									<OutlineButton
										name="Add More"
										onClick={addReference}
									/>
								</div>
							)}
						</div>

						<div className="section-header">
							<p className="section-title">Availability</p>
							<button onClick={resetAvailabilities}>
								Reset Availabilities
							</button>
						</div>

						{availabilities.map((availability, index) => (
							<div className="availability-day" key={index}>
								<p>{availability.day}: </p>
								<div>
									<p>From</p>
									<input
										type="time"
										value={availability.from}
										onChange={(e) =>
											setAvailabilities([
												...availabilities.slice(
													0,
													index,
												),
												{
													...availability,
													from: e.target.value,
												},
												...availabilities.slice(
													index + 1,
												),
											])
										}
									/>
								</div>
								<div>
									<p>To</p>
									<input
										type="time"
										value={availability.to}
										onChange={(e) =>
											setAvailabilities([
												...availabilities.slice(
													0,
													index,
												),
												{
													...availability,
													to: e.target.value,
												},
												...availabilities.slice(
													index + 1,
												),
											])
										}
									/>
								</div>
							</div>
						))}

						<div className="role-apply-btn">
							<PrimaryButton
								name="Apply"
								onClick={handleApplication}
								type={readyForSubmit ? "" : "muted"}
							/>
						</div>
					</div>
				</>
			) : (
				<p>Role not found</p>
			)}
		</Container>
	);
}

export default RoleApply;
