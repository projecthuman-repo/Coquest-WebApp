import React, { useState } from "react";
import PrimaryButton from "../Buttons/PrimaryButton";
import OutlineButton from "../Buttons/OutlineButton";
import { RoleApplicant } from "../../models/roleModel";
import "./ApplicantCard.css";

interface ApplicantCardProps {
	applicant: RoleApplicant;
}

function ApplicantCard({ applicant }: ApplicantCardProps) {
	const [expanded, setExpanded] = useState(false);

	const [experienceExpanded, setExperienceExpanded] = useState(false);
	const [projectsExpanded, setProjectsExpanded] = useState(false);
	const [educationExpanded, setEducationExpanded] = useState(false);
	const [certificationsExpanded, setCertificationsExpanded] = useState(false);
	const [badgesExpanded, setBadgesExpanded] = useState(false);
	const [referencesExpanded, setReferencesExpanded] = useState(false);

	return (
		<>
			<div className="applicant-container">
				<div className="applicant-header">
					<div>
						<p className="text-heading">{applicant.name}</p>
						<div className="applicant-company-address">
							<p>{applicant.companyName}</p>
							<p>{applicant.address}</p>
						</div>
					</div>
					<div className="text-align-right">
						<div className="application-date">
							<p>
								Applied on{" "}
								{new Date(applicant.dateApplied) instanceof
									Date &&
								!isNaN(
									new Date(applicant.dateApplied).getTime(),
								)
									? new Date(
											applicant.dateApplied,
										).toLocaleDateString("en-US", {
											year: "numeric",
											month: "long",
											day: "numeric",
										})
									: "N/A"}
							</p>
						</div>
						<div className="applicant-contact">
							<p>{applicant.phone}</p>
							<p>{applicant.email}</p>
						</div>
					</div>
				</div>

				{expanded && (
					<>
						<div className="applicant-info">
							<div className="applicant-experience">
								<div className="section-header">
									<p>Experience</p>
									<button
										onClick={() =>
											setExperienceExpanded(
												!experienceExpanded,
											)
										}
									>
										{experienceExpanded
											? "Collapse"
											: "Expand"}
									</button>
								</div>
								{experienceExpanded ? (
									<div className="experience-list">
										{applicant.experience?.map(
											(exp: any, index: number) => (
												<div key={index}>
													<p className="section-title">
														{exp.title}
													</p>
													<p className="muted-info">
														{new Date(
															exp.startDate,
														) instanceof Date &&
														!isNaN(
															new Date(
																exp.startDate,
															).getTime(),
														)
															? new Date(
																	exp.startDate,
																).toLocaleDateString(
																	"en-US",
																	{
																		year: "numeric",
																		month: "long",
																		day: "numeric",
																	},
																)
															: "N/A"}
														&nbsp;-&nbsp;
														{exp.endDate &&
														new Date(
															exp.endDate,
														) instanceof Date &&
														!isNaN(
															new Date(
																exp.endDate,
															).getTime(),
														)
															? new Date(
																	exp.endDate,
																).toLocaleDateString(
																	"en-US",
																	{
																		year: "numeric",
																		month: "long",
																		day: "numeric",
																	},
																)
															: "now"}
													</p>
													<p>{exp.description}</p>
												</div>
											),
										)}
									</div>
								) : (
									<p className="muted-info">
										{applicant.experience?.length}{" "}
										{applicant.experience?.length === 1
											? "experience"
											: "experiences"}
									</p>
								)}
							</div>

							<div className="applicant-projects">
								<div className="section-header">
									<p>Previous Projects</p>
									<button
										onClick={() =>
											setProjectsExpanded(
												!projectsExpanded,
											)
										}
									>
										{projectsExpanded
											? "Collapse"
											: "Expand"}
									</button>
								</div>
								{projectsExpanded ? (
									<div className="projects-list">
										{applicant.previousProjects?.map(
											(proj: any, index: number) => (
												<div key={index}>
													<p className="section-title">
														{proj.title}
													</p>
													<p className="muted-info">
														{new Date(
															proj.startDate,
														) instanceof Date &&
														!isNaN(
															new Date(
																proj.startDate,
															).getTime(),
														)
															? new Date(
																	proj.startDate,
																).toLocaleDateString(
																	"en-US",
																	{
																		year: "numeric",
																		month: "long",
																		day: "numeric",
																	},
																)
															: "N/A"}
														&nbsp;-&nbsp;
														{proj.endDate &&
														new Date(
															proj.endDate,
														) instanceof Date &&
														!isNaN(
															new Date(
																proj.endDate,
															).getTime(),
														)
															? new Date(
																	proj.endDate,
																).toLocaleDateString(
																	"en-US",
																	{
																		year: "numeric",
																		month: "long",
																		day: "numeric",
																	},
																)
															: "now"}
													</p>
													<p>{proj.description}</p>
												</div>
											),
										)}
									</div>
								) : (
									<p className="muted-info">
										{applicant.previousProjects?.length}{" "}
										{applicant.previousProjects?.length ===
										1
											? "project"
											: "projects"}
									</p>
								)}
							</div>

							<div className="applicant-education">
								<div className="section-header">
									<p>Education</p>
									<button
										onClick={() =>
											setEducationExpanded(
												!educationExpanded,
											)
										}
									>
										{educationExpanded
											? "Collapse"
											: "Expand"}
									</button>
								</div>

								{educationExpanded ? (
									<div className="education-list">
										{applicant.education?.map(
											(edu: any, index: number) => (
												<div key={index}>
													<p className="section-title">
														{edu.title}
													</p>
													<p className="muted-info">
														{new Date(
															edu.startDate,
														) instanceof Date &&
														!isNaN(
															new Date(
																edu.startDate,
															).getTime(),
														)
															? new Date(
																	edu.startDate,
																).toLocaleDateString(
																	"en-US",
																	{
																		year: "numeric",
																		month: "long",
																		day: "numeric",
																	},
																)
															: "N/A"}
														&nbsp;-&nbsp;
														{edu.endDate &&
														new Date(
															edu.endDate,
														) instanceof Date &&
														!isNaN(
															new Date(
																edu.endDate,
															).getTime(),
														)
															? new Date(
																	edu.endDate,
																).toLocaleDateString(
																	"en-US",
																	{
																		year: "numeric",
																		month: "long",
																		day: "numeric",
																	},
																)
															: "now"}
														&nbsp;(
														{edu.completionStatus
															? "Completed"
															: "In Progress"}
														)
													</p>
													<p>{edu.description}</p>
												</div>
											),
										)}
									</div>
								) : (
									<p className="muted-info">
										{applicant.education?.length}{" "}
										{applicant.education?.length === 1
											? "education"
											: "educations"}
									</p>
								)}
							</div>

							<div className="applicant-certifications">
								<div className="section-header">
									<p>Certifications</p>
									<button
										onClick={() =>
											setCertificationsExpanded(
												!certificationsExpanded,
											)
										}
									>
										{certificationsExpanded
											? "Collapse"
											: "Expand"}
									</button>
								</div>

								{certificationsExpanded ? (
									<div className="certifications-list">
										{applicant.certifications?.map(
											(cert: any, index: number) => (
												<div key={index}>
													<p className="section-title">
														{cert.title}
													</p>
													<p className="muted-info">
														{new Date(
															cert.issueDate,
														) instanceof Date &&
														!isNaN(
															new Date(
																cert.issueDate,
															).getTime(),
														)
															? new Date(
																	cert.issueDate,
																).toLocaleDateString(
																	"en-US",
																	{
																		year: "numeric",
																		month: "long",
																		day: "numeric",
																	},
																)
															: "N/A"}
													</p>
													<p>{cert.description}</p>
												</div>
											),
										)}
									</div>
								) : (
									<p className="muted-info">
										{applicant.certifications?.length}{" "}
										{applicant.certifications?.length === 1
											? "certification"
											: "certifications"}
									</p>
								)}
							</div>

							<div className="applicant-badges">
								<div className="section-header">
									<p>Badges</p>
									<button
										onClick={() =>
											setBadgesExpanded(!badgesExpanded)
										}
									>
										{badgesExpanded ? "Collapse" : "Expand"}
									</button>
								</div>
								{badgesExpanded ? (
									<div className="badges-list">
										{applicant.badges?.map(
											(badge: any, index: number) => (
												<div key={index}>
													<p className="section-title">
														{badge.title}
													</p>
													<p>{badge.description}</p>
												</div>
											),
										)}
									</div>
								) : (
									<p className="muted-info">
										{applicant.badges?.length}{" "}
										{applicant.badges?.length === 1
											? "badge"
											: "badges"}
									</p>
								)}
							</div>

							<div className="applicant-references">
								<div className="section-header">
									<p>References</p>
									<button
										onClick={() =>
											setReferencesExpanded(
												!referencesExpanded,
											)
										}
									>
										{referencesExpanded
											? "Collapse"
											: "Expand"}
									</button>
								</div>

								{referencesExpanded ? (
									<div className="references-list">
										{applicant.references?.map(
											(ref: any, index: number) => (
												<div key={index}>
													<p>{ref.name}</p>
													<p className="muted-info">
														{ref.companyName}
													</p>
													<p className="muted-info">
														{ref.phone}
													</p>
													<p className="muted-info">
														{ref.email}
													</p>
												</div>
											),
										)}
									</div>
								) : (
									<p className="muted-info">
										{applicant.references?.length}{" "}
										{applicant.references?.length === 1
											? "reference"
											: "references"}
									</p>
								)}
							</div>

							<div className="applicant-availability">
								<p>Availability</p>
								<div className="availability-list">
									{applicant.availability.map(
										(avail: any, index: number) => (
											<p key={index}>
												{avail.day} {avail.from} -{" "}
												{avail.to}
											</p>
										),
									)}
								</div>
							</div>
						</div>

						<div className="application-btns">
							<PrimaryButton name="Schedule Interview" />
							<OutlineButton name="Message" filled={true} />
							<OutlineButton name="Hire" filled={true} />
						</div>
					</>
				)}

				<button onClick={() => setExpanded(!expanded)}>
					{expanded ? (
						<img
							src="/icons/collapse-button-chevron.png"
							alt="collapse-button"
						/>
					) : (
						<img
							src="/icons/expand-button-chevron.png"
							alt="expand-button"
						/>
					)}
				</button>
			</div>
		</>
	);
}

export default ApplicantCard;
