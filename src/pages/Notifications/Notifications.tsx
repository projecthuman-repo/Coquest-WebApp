import React, { useState, useEffect } from "react";
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
		height: 722,
	},
	borderRadius: 10,
});
const StyledButton = styled(Button)({
	width: 91.49,
	height: 40,
	marginTop: 66,
	marginLeft: 566.5,
	backgroundColor: "#D9D9D9",
	borderRadius: 20,
	color: "black",
	fontSize: 16,
	fontWeight: 600,
	lineHeight: 24,
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
	const [unreadNotifications, setUnreadNotifications] = useState<any[]>([]);
	const [allNotifications, setAllNotifications] = useState<any[]>([]);

	useEffect(() => {
		// Fetch unread notifications
		fetch(
			'https://my-gateway-1njig8y6.uc.gateway.dev/regenquest?query={getUnreadNotifications(userID: "notificationstest1") {userID notificationID title content image link date isRead isDeleted}}',
			{
				headers: {
					"x-apollo-operation-name": "getUnreadNotifications",
				},
			}
		)
			.then((res) => res.json())
			.then((result) => {
				console.log(
					"Unread notifications:",
					result.data.getUnreadNotifications
				);
				setUnreadNotifications(result.data.getUnreadNotifications);
			});

		fetch(
			'https://my-gateway-1njig8y6.uc.gateway.dev/regenquest?query={getNotifications(userID: "notificationstest1") {userID notificationID title content image link date isRead isDeleted}}',
			{
				headers: {
					"x-apollo-operation-name": "getNotifications",
				},
			}
		)
			.then((res) => res.json())
			.then((result) => {
				console.log("All notifications:", result.data.getNotifications);
				setAllNotifications(result.data.getNotifications);
			});
	}, []);

	const handleNotificationClick = (index: number) => {
		setSelectedNotification(index);
		if (!allNotifications[index].isRead) {
			fetch(
				`https://my-gateway-1njig8y6.uc.gateway.dev/regenquest?query={markNotificationAsRead(notificationID:"${allNotifications[index].notificationID}"){code response}}`,
				{
					headers: {
						"x-apollo-operation-name": "markNotificationAsRead",
					},
				}
			)
				.then((res) => res.json())
				.then((result) => {
					console.log(result); // add this line to log the response to the console
					if (result.data.markNotificationAsRead.code === 0) {
						const updatedNotifications = [...allNotifications];
						updatedNotifications[index].isRead = true;
						setAllNotifications(updatedNotifications);

						// Remove the read notification from the unreadNotifications list
						const updatedUnreadNotifications =
							unreadNotifications.filter(
								(unreadNotification) =>
									unreadNotification.notificationID !==
									allNotifications[index].notificationID
							);
						setUnreadNotifications(updatedUnreadNotifications);
					}
				});
		}
	};

	return (
		<div>
			<div className="title-container">
				<h1 className="notifications-title">Notifications</h1>
				<NewNotificationsNumber number={unreadNotifications.length} />
			</div>{" "}
			<div className="notifications-container">
				<div className="notifications-container-left">
					{allNotifications.map((notification, index) => {
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
					<Paper elevation={3}>
						{selectedNotification !== null &&
							allNotifications[selectedNotification] && (
								<>
									<NotificationsImage
										image={
											allNotifications[
												selectedNotification
											].image
										}
									/>
									<NotificationsContent
										content={
											allNotifications[
												selectedNotification
											].content
										}
									/>
									<Link
										href={
											allNotifications[
												selectedNotification
											].link
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
