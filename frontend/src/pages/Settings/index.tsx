import React, { useState } from "react";
import Account from "./Account"; // Account component for the first section
import Notifications from "./Notifications"; // Notifications component for the second section
import PrivacySecurity from "./PrivacySecurity"; // Privacy and Security component for the third section
import {
	AccountCircle,
	Notifications as NotificationsIcon,
	Security,
	Group,
	Bookmark,
	Info,
	Help,
} from "@mui/icons-material";
import "./index.css";
import styled from "@emotion/styled";

const Settings = () => {
	const [activeSection, setActiveSection] = useState("account");

	// Function to render content based on active section
	const renderContent = () => {
		switch (activeSection) {
			case "account":
				return <Account />;
			case "notifications":
				return <Notifications />;
			case "privacy":
				return <PrivacySecurity />;
			default:
				return <Account />;
		}
	};

	const Title = styled.h1({
		// width: "100%",
		textAlign: "left",
		fontWeight: 600,
		fontSize: 36,
		marginTop: "60px",
		marginBottom: "20px",
		marginLeft: "11.5%",
		fontFamily: "Poppins",
	});

	return (
		<div className="settings-page">
			<Title>Settings</Title>
			<div className="settings-container">
				<div className="settings-sidebar">
					<button
						className={`sidebar-button ${activeSection === "account" ? "active" : ""}`}
						onClick={() => setActiveSection("account")}
					>
						<AccountCircle className="icon" />
						Account
					</button>
					<button
						className={`sidebar-button ${activeSection === "notifications" ? "active" : ""}`}
						onClick={() => setActiveSection("notifications")}
					>
						<NotificationsIcon className="icon" />
						Notifications
					</button>
					<button
						className={`sidebar-button ${activeSection === "privacy" ? "active" : ""}`}
						onClick={() => setActiveSection("privacy")}
					>
						<Security className="icon" />
						Privacy and Security
					</button>
					<button className="sidebar-button">
						<Group className="icon" />
						Connect social media
					</button>
					<button className="sidebar-button">
						<Bookmark className="icon" />
						Saved
					</button>
					<button className="sidebar-button">
						<Info className="icon" />
						About
					</button>
					<button className="sidebar-button">
						<Help className="icon" />
						Help
					</button>
				</div>
				<div className="settings-content">{renderContent()}</div>
			</div>
		</div>
	);
};

export default Settings;
