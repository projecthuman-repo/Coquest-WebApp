import React from "react";
import Input from "../../../../components/Input";
import PrimaryButton from "../../../../components/Buttons/PrimaryButton";
import "./SignUpModal.css";

interface SignUpModalProps {
	name: string;
	cost: number | null | undefined;
	handleSignUpModal: () => void;
	handleSignUp: () => void;
}

function SignUpModal({
	name,
	cost,
	handleSignUpModal,
	handleSignUp,
}: SignUpModalProps) {
	const [signupName, setSignupName] = React.useState("");
	const [signupAddress, setSignupAddress] = React.useState("");
	const [signupPhone, setSignupPhone] = React.useState("");
	const [signupEmail, setSignupEmail] = React.useState("");
	const [signupTermsAgreed, setSignupTermsAgreed] = React.useState(false);
	const [signupCardNumber, setSignupCardNumber] = React.useState("");
	const [signupCardHolder, setSignupCardHolder] = React.useState("");
	const [signupCardExpiration, setSignupCardExpiration] = React.useState("");
	const [signupCardCVV, setSignupCardCVV] = React.useState("");

	return (
		<div className="signup-modal-container">
			<div className="signup-modal">
				<div className="signup-header">
					<p>Sign up for {name}</p>
					<button onClick={handleSignUpModal}>
						<img src="/icons/close-grey.png" alt="Close Icon" />
					</button>
				</div>

				<div className="signup-modal-content">
					<div className="signup-form">
						<div className="participant-info">
							<p className="bolded">Participant Information</p>
							<Input label="Full name">
								<input
									type="text"
									placeholder=""
									value={signupName}
									onChange={(e) =>
										setSignupName(e.target.value)
									}
								/>
							</Input>
							<Input label="Address">
								<input
									type="text"
									placeholder=""
									value={signupAddress}
									onChange={(e) =>
										setSignupAddress(e.target.value)
									}
								/>
							</Input>
							<Input label="Phone Number">
								<input
									type="text"
									placeholder=""
									value={signupPhone}
									onChange={(e) =>
										setSignupPhone(e.target.value)
									}
								/>
							</Input>
							<Input label="Email Address">
								<input
									type="email"
									placeholder=""
									value={signupEmail}
									onChange={(e) =>
										setSignupEmail(e.target.value)
									}
								/>
							</Input>
							<div className="terms-conditions">
								<input
									type="checkbox"
									checked={signupTermsAgreed}
									onChange={(e) =>
										setSignupTermsAgreed(e.target.checked)
									}
									id="terms-agreed"
									name="terms-agreed"
								/>
								{/* TODO add proper link to terms and conditions */}
								<label htmlFor="terms-agreed">
									I agree to with{" "}
									<a href="/terms-and-conditions">
										Terms and Conditions
									</a>
								</label>
							</div>
						</div>
						<div className="payment-info">
							<p className="bolded">Payment Information</p>
							<Input label="Credit/Debit card number">
								<input
									type="text"
									placeholder=""
									value={signupCardNumber}
									onChange={(e) =>
										setSignupCardNumber(e.target.value)
									}
								/>
							</Input>
							<Input label="Card holder">
								<input
									type="text"
									placeholder=""
									value={signupCardHolder}
									onChange={(e) =>
										setSignupCardHolder(e.target.value)
									}
								/>
							</Input>
							<div className="card-info-exp-cvv">
								<Input label="Expiration date">
									<input
										type="text"
										placeholder=""
										value={signupCardExpiration}
										onChange={(e) =>
											setSignupCardExpiration(
												e.target.value,
											)
										}
									/>
								</Input>
								<Input label="CVV">
									<input
										type="text"
										placeholder=""
										value={signupCardCVV}
										onChange={(e) =>
											setSignupCardCVV(e.target.value)
										}
									/>
								</Input>
							</div>
						</div>
					</div>

					<div className="payment-summary">
						<p className="bolded">Payment</p>
						<hr></hr>
						<div>
							<div>
								<p>Program Cost</p>
								<p>${cost}</p>
							</div>
							<div>
								<p>Fees</p>
								{/* TODO add a formula how fees are calculated */}
								<p>$0.50</p>
							</div>
						</div>
						<hr></hr>
						<div>
							<div>
								<p className="bolded">Total cost</p>
								{/* TODO add a formula how fees are calculated */}
								<p>${cost ? (cost + 0.5).toFixed(2) : ""}</p>
							</div>
						</div>
					</div>
				</div>

				<div className="signup">
					<PrimaryButton name="Sign up" onClick={handleSignUp} />
				</div>
			</div>
		</div>
	);
}

export default SignUpModal;
