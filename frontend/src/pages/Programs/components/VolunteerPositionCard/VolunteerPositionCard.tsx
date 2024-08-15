import React, { useState } from "react";
import OutlineButton from "../../../../components/Buttons/OutlineButton";
import Input from "../../../../components/Input";
import { VolunteerPosition } from "../../../../models/programModel";
import "./VolunteerPositionCard.css";

function VolunteerPositionCard({
	id,
	title,
	responsibilities,
	skills,
}: VolunteerPosition) {
	const [expanded, setExpanded] = useState(false);

	// application for volunteer position
	const [scrollY, setScrollY] = useState(0);
	const [applicationStarted, setApplicationStarted] = useState(false);
	const [applicationName, setApplicationName] = useState("");
	const [applicationAddress, setApplicationAddress] = useState("");
	const [applicationPhone, setApplicationPhone] = useState("");
	const [applicationEmail, setApplicationEmail] = useState("");
	const [applicationAvailability, setApplicationAvailability] = useState("");

	function handleApplicationModal() {
		setApplicationStarted(!applicationStarted);

		setScrollY(window.scrollY);
		if (!applicationStarted) {
			document.body.style.overflow = "hidden";
			window.scrollTo(0, 0);
		} else {
			document.body.style.overflow = "auto";
			window.scrollTo(0, scrollY);
		}
	}

	function handleApplication() {
		const applicationData = {
			name: applicationName,
			address: applicationAddress,
			phone: applicationPhone,
			email: applicationEmail,
			availability: applicationAvailability,
		};

		console.log("Application submitted for application " + id);
		console.log(applicationData);

		//TODO submit application to backend

		setApplicationName("");
		setApplicationAddress("");
		setApplicationPhone("");
		setApplicationEmail("");
		setApplicationAvailability("");
		handleApplicationModal();
	}

	return (
		<>
			{applicationStarted && (
				<div className="volunteer-application-modal-container">
					<div className="volunteer-application-modal">
						<div className="application-header">
							<p>Apply for {title}</p>
							<button onClick={handleApplicationModal}>
								<img
									src="/icons/close-grey.png"
									alt="Close Icon"
								/>
							</button>
						</div>

						<div className="application-form">
							<div className="contact-information">
								<p>Contact Information</p>
								<Input label="Full Name">
									<input
										type="text"
										value={applicationName}
										placeholder=""
										onChange={(e) =>
											setApplicationName(e.target.value)
										}
									/>
								</Input>
								<Input label="Address">
									<input
										type="text"
										value={applicationAddress}
										placeholder=""
										onChange={(e) =>
											setApplicationAddress(
												e.target.value,
											)
										}
									/>
								</Input>
								<Input label="Phone number">
									<input
										type="text"
										value={applicationPhone}
										placeholder=""
										onChange={(e) =>
											setApplicationPhone(e.target.value)
										}
									/>
								</Input>
								<Input label="Email Address">
									<input
										type="text"
										value={applicationEmail}
										placeholder=""
										onChange={(e) =>
											setApplicationEmail(e.target.value)
										}
									/>
								</Input>
							</div>

							<div className="availability">
								<p>Availability</p>
								<Input label="Availability">
									<textarea
										rows={3}
										placeholder=""
										value={applicationAvailability}
										onChange={(e) =>
											setApplicationAvailability(
												e.target.value,
											)
										}
									></textarea>
								</Input>
							</div>
						</div>

						<div className="volunteer-apply">
							<OutlineButton
								name="Apply"
								onClick={handleApplication}
							/>
						</div>
					</div>
				</div>
			)}

			<div className="prg-v-container">
				<div className="prg-v-background">
					<div className="volunteer-header">
						<p className="prg-v-heading">{title}</p>
						<button onClick={() => setExpanded(!expanded)}>
							{expanded ? (
								<img
									src="/icons/collapse-button-chevron.png"
									alt="collapse-button"
									className="volunteer-collapse-button"
								/>
							) : (
								<img
									src="/icons/next-button-chevron.png"
									alt="expand-button"
									className="volunteer-expand-button"
								/>
							)}
						</button>
					</div>
					{expanded && (
						<div className="volunteer-responsibilities">
							<b>Responsibilities</b>
							<p className="prg-m-text">{responsibilities}</p>
						</div>
					)}
					{expanded && skills.length > 0 && (
						<div className="volunteer-skills">
							<b>Skills and certifications</b>
							<ul>
								{skills.map((skill, index) => (
									<li key={index}>{skill}</li>
								))}
							</ul>
						</div>
					)}
					{expanded && (
						<div className="volunteer-apply">
							<OutlineButton
								name="Apply"
								onClick={handleApplicationModal}
							/>
						</div>
					)}
				</div>
			</div>
		</>
	);
}

export default VolunteerPositionCard;
