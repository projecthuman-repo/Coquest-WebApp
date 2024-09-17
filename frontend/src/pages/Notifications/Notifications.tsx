import React, { useState } from "react";
import "./style.css";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";

const StyledBox = styled(Box)({
	display: "flex",
	flexWrap: "wrap",
	"& > :not(style)": {
		m: 1,
		width: 699,
		height: 700,
	},
	borderRadius: 10,
});

const StyledButton = styled(Button)({
	width: 91.49,
	height: 40,
	marginTop: 66,
	marginRight: 20,
	backgroundColor: "#D9D9D9",
	borderRadius: 20,
	color: "black",
	fontSize: 16,
	fontWeight: 600,
	lineHeight: 24,
	float: "right",
	":hover": {
		backgroundColor: "#bcbcbc",
	},
});

const StyledArrowIcon = styled(KeyboardArrowRightIcon)({
	marginRight: 20,
});

interface NotificationsProps {
	title: string;
	onClick: () => void;
}

interface NewNotificationsNumberProps {
	number: number;
}

interface NotificationsImageProps {
	image?: string;
}

interface NotificationsContentProps {
	content: string;
}

const NewNotificationsNumber: React.FC<NewNotificationsNumberProps> = ({
	number,
}) => {
	return <div className="notifications-new-notify">{number} new.</div>;
};

const NewNotificationsCard: React.FC<NotificationsProps> = ({
	title,
	onClick,
}) => {
	return (
		<div className="display-new-notifications-title" onClick={onClick}>
			{title}
			<StyledArrowIcon />
		</div>
	);
};

const OldNotificationsCard: React.FC<NotificationsProps> = ({
	title,
	onClick,
}) => {
	return (
		<div className="display-notifications-title" onClick={onClick}>
			{title}
			<StyledArrowIcon />
		</div>
	);
};

const NotificationsImage: React.FC<NotificationsImageProps> = ({ image }) => {
	return (
		<div className="notifications-container-right-image-holder">
			{image && <img src={image} alt="notifications-content-img" />}
		</div>
	);
};

const NotificationsContent: React.FC<NotificationsContentProps> = ({
	content,
}) => {
	return (
		<div className="notifications-container-right-contain">{content}</div>
	);
};

const Notifications: React.FC = () => {
	const [selectedNotification, setSelectedNotification] = useState<
		number | null
	>(null);

	const notifications = [
		{
			notificationID: "1",
			title: "New message from John",
			content: "Hey, let's catch up tomorrow!",
			image: "https://via.placeholder.com/150",
			link: "https://example.com",
			isRead: false,
		},
		{
			notificationID: "2",
			title: "Project update",
			content: "Your project has been approved.",
			image: "https://via.placeholder.com/150",
			link: "https://example.com",
			isRead: true,
		},
		// Add more static notifications as needed
	];

	const handleNotificationClick = (index: number) => {
		setSelectedNotification(index);
	};

	return (
		<div>
			<div className="title-container">
				<h1 className="notifications-title">Notifications</h1>
				<NewNotificationsNumber
					number={notifications.filter((n) => !n.isRead).length}
				/>
			</div>
			<div className="notifications-container">
				<div className="notifications-container-left">
					{notifications.map((notification, index) => {
						const Card = notification.isRead
							? OldNotificationsCard
							: NewNotificationsCard;
						return (
							<Card
								key={notification.notificationID}
								title={notification.title}
								onClick={() => handleNotificationClick(index)}
							/>
						);
					})}
				</div>
				<StyledBox className="notifications-container-right">
					<Paper elevation={3} sx={{ width: "100% !important" }}>
						{selectedNotification !== null &&
							notifications[selectedNotification] && (
								<>
									<NotificationsImage
										image={
											notifications[selectedNotification]
												.image
										}
									/>
									<NotificationsContent
										content={
											notifications[selectedNotification]
												.content
										}
									/>
									<Link
										href={
											notifications[selectedNotification]
												.link
										}
										target="_blank"
										rel="noopener noreferrer"
									>
										<StyledButton>More</StyledButton>
									</Link>
								</>
							)}
					</Paper>
				</StyledBox>
			</div>
		</div>
	);
};

export default Notifications;
