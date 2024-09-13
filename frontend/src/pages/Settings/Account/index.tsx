import React, { useState, useEffect } from "react";
import "./index.css";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { subscribeToUserModelSubject } from "../../../observers/userobserver"; // Ensure this path is correct

const Account = () => {
	// State to manage edit mode for each section
	const [isEditingName, setIsEditingName] = useState(false);
	const [isEditingContact, setIsEditingContact] = useState(false);

	// State to manage form values
	const [name, setName] = useState("john");
	const [pronouns, setPronouns] = useState("he/him/his");
	const [email, setEmail] = useState("johndoe@email.com");
	const [phone, setPhone] = useState("111-111-1111");

	// Handlers for toggling edit mode
	const toggleEditName = () => setIsEditingName(!isEditingName);
	const toggleEditContact = () => setIsEditingContact(!isEditingContact);

	// Handlers for saving changes
	const saveName = () => {
		toggleEditName();
		// Here you would typically update the backend or context state
	};

	const saveContact = () => {
		toggleEditContact();
		// Here you would typically update the backend or context state
	};

	useEffect(() => {
		let unsubscribe: (() => void) | null | undefined = null;

		const setupSubscription = async () => {
			unsubscribe = await subscribeToUserModelSubject((user) => {
				console.log(user);
				setName(
					user.name.first.toString() +
						" " +
						user.name.last.toString(),
				); // Update to use the 'name' field

				setEmail(user.email.toString()); // Update to use the 'email' field

				// setPhone(user.phone.toString()); // Update to use the 'phone number' field
			});
		};

		setupSubscription();

		return () => {
			if (unsubscribe) {
				unsubscribe(); // Ensure proper cleanup on component unmount
			}
		};
	}, []);

	return (
		<div className="account-section">
			<h2 className="account-title">Account</h2>
			<div className="account-content">
				<div className="profile-container">
					<AccountCircle
						className="profile-icon"
						fontSize="inherit"
					/>
					<div className="username">
						<span className="username-label">{name}</span>
						<span className="username-value">{email}</span>
					</div>
				</div>

				{/* Name Section */}
				<div className="account-details">
					<div className="detail-section">
						<h3 className="section-title">
							Name
							<button
								onClick={
									isEditingName ? saveName : toggleEditName
								}
								className="edit-link"
							>
								{isEditingName ? "Save" : "Edit"}
							</button>
						</h3>
						<div className="detail">
							<span className="detail-label">Full name</span>
							{isEditingName ? (
								<input
									type="text"
									value={name}
									onChange={(e) => setName(e.target.value)}
									className="input-field"
								/>
							) : (
								<span>{name}</span>
							)}
						</div>
						<div className="detail">
							<span className="detail-label">Pronouns</span>
							{isEditingName ? (
								<select
									value={pronouns}
									onChange={(e) =>
										setPronouns(e.target.value)
									}
									className="input-field"
								>
									<option value="he/him/his">
										he/him/his
									</option>
									<option value="she/her/hers">
										she/her/hers
									</option>
									<option value="they/them/theirs">
										they/them/theirs
									</option>
								</select>
							) : (
								<span>{pronouns}</span>
							)}
						</div>
					</div>

					{/* Contact Information Section */}
					<div className="detail-section">
						<h3 className="section-title">
							Contact information
							<button
								onClick={
									isEditingContact
										? saveContact
										: toggleEditContact
								}
								className="edit-link"
							>
								{isEditingContact ? "Save" : "Edit"}
							</button>
						</h3>
						<div className="detail">
							<span className="detail-label">Email</span>
							{isEditingContact ? (
								<input
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="input-field"
								/>
							) : (
								<span>{email}</span>
							)}
						</div>
						<div className="detail">
							<span className="detail-label">Phone number</span>
							{isEditingContact ? (
								<input
									type="text"
									value={phone}
									onChange={(e) => setPhone(e.target.value)}
									className="input-field"
								/>
							) : (
								<span>{phone}</span>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Account;
