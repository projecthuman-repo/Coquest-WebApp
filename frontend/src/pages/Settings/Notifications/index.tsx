import React, { useState } from "react";
import "./index.css";
import { Switch, Checkbox } from "@mui/material";

const Notifications = () => {
	const [notifications, setNotifications] = useState({
		messages: true,
		tasks: true,
		meetingReminders: true,
		invitations: false,
		projects: false,
		programs: false,
		coops: false,
		groupsManaged: true,
	});

	const toggleNotification = (key: string) => {
		setNotifications((prev) => ({
			...prev,
			[key]: !prev[key as keyof typeof prev],
		}));
	};

	return (
		<div className="notifications-section">
			<h2 className="notifications-title">Notifications</h2>
			<div className="notifications-settings">
				{Object.entries(notifications).map(([key, value]) => (
					<div key={key} className="notification-option">
						<Switch
							checked={value}
							onChange={() => toggleNotification(key)}
							color="default"
							sx={{
								"& .MuiSwitch-switchBase.Mui-checked": {
									color: "#666666",
								},
								"& .MuiSwitch-track": {
									backgroundColor: "#C4C4C4",
								},
							}}
						/>
						<span className="notification-label">
							{key.charAt(0).toUpperCase() +
								key.slice(1).replace(/([A-Z])/g, " $1")}
						</span>
					</div>
				))}
			</div>
			<div className="notification-preferences">
				<p>How would you like to receive notifications?</p>
				<label>
					<Checkbox
						sx={{
							color: "#666666", // Default color
							"&.Mui-checked": {
								color: "#666666", // Black when checked
							},
						}}
					/>
					Push notifications
				</label>
				<label>
					<Checkbox
						sx={{
							color: "#666666", // Default color
							"&.Mui-checked": {
								color: "#666666", // Black when checked
							},
						}}
						defaultChecked
					/>
					Email
				</label>
			</div>
		</div>
	);
};

export default Notifications;
