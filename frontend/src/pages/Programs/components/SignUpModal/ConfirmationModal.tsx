import React from "react";
import PrimaryButton from "../../../../components/Buttons/PrimaryButton";
import "./SignUpModal.css";

interface ConfirmationModalProps {
	name: string;
	time: string | null;
	date: string | null;
	location: string;
	cost: number | null;
	confirmationNumber: number;
	handleSignUpModal: () => void;
}

function ConfirmationModal({
	name,
	time,
	date,
	location,
	cost,
	confirmationNumber,
	handleSignUpModal,
}: ConfirmationModalProps) {
	return (
		<>
			<div className="signup-modal-container">
				<div className="signup-modal">
					<div className="signup-header">
						<p>Sign up for {name}</p>
						<button onClick={handleSignUpModal}>
							<img src="/icons/close-grey.png" alt="Close Icon" />
						</button>
					</div>

					<div className="confirmation-form">
						<p className="bolded">
							You have successfully signed up for {name}
						</p>
						<p>{confirmationNumber}</p>
						<p>
							Check your email for additional details about the
							program.
						</p>
						<div>
							<p>
								<span className="bolded">Time: </span>
								{time}
							</p>
							<p>
								<span className="bolded">Date: </span>
								{date}
							</p>
							<p>
								<span className="bolded">Location: </span>
								{location}
							</p>
							<p>
								<span className="bolded">Cost: </span>${cost}
							</p>
						</div>
					</div>

					<div className="signup">
						<PrimaryButton
							name="Finish"
							onClick={handleSignUpModal}
						/>
					</div>
				</div>
			</div>
		</>
	);
}

export default ConfirmationModal;
