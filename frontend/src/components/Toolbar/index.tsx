import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import { Toolbar as MaterialToolbar } from "@mui/material";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MessageIcon from "@mui/icons-material/Message";
import NotificationsIcon from "@mui/icons-material/Notifications";
import styled from "@emotion/styled";
import { subscribeToUserModelSubject } from "../../observers/userobserver";
import DropdownMenu from "../DropDownMenu/DropDownMenuComponent"; // Import the new dropdown menu component
import { Name } from "../../models/usermodel";

const Container = styled.div({
	width: "100%",
});

const Spacer = styled.div({
	width: 4,
});

const ProfileContainer = styled.div({
	display: "flex",
	alignItems: "center",
	gap: "10px",
	paddingLeft: "25px",
	position: "relative", // Add relative positioning for dropdown positioning
});

const ProfileIcon = styled(AccountCircleIcon)({
	color: "#666666",
	padding: "6px",
	cursor: "pointer",
	fontSize: "36px", // Increase the font size
	"&:hover": {
		backgroundColor: "rgba(0, 0, 0, 0.049)",
		borderRadius: "50%",
	},
});

const ProfileButton = ({
	name,
	onClick,
}: {
	name: string;
	onClick: () => void;
}) => (
	<ProfileContainer onClick={onClick}>
		<ProfileIcon />
		<Typography>{name}</Typography>
	</ProfileContainer>
);

const Toolbar = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const [name, setName] = useState<Name>({
		first: "",
		last: "",
	}); // Default name to "User" until fetched
	const navigate = useNavigate();

	useEffect(() => {
		let unsubscribe: (() => void) | null | undefined = null;

		const setupSubscription = async () => {
			unsubscribe = await subscribeToUserModelSubject((user) => {
				setName(user.name); // Update to use the 'name' field
			});
		};

		setupSubscription();

		return () => {
			if (unsubscribe) {
				unsubscribe(); // Ensure proper cleanup on component unmount
			}
		};
	}, []);

	const handleNotificationClick = () => {
		console.log("Notifications icon clicked");
		navigate("/notifications");
		window.location.reload(); // Temporary fix to ensure the page loads
	};

	const handleMessageClick = () => {
		console.log("Message icon clicked");
		navigate("/message");
		window.location.reload(); // Temporary fix to ensure the page loads
	};

	const handleProfileClick = () => {
		setMenuOpen(!menuOpen); // Toggle the dropdown menu
	};

	return (
		<Container>
			<AppBar>
				<MaterialToolbar>
					<IconButton onClick={handleNotificationClick}>
						<NotificationsIcon />
					</IconButton>
					<Spacer />
					<IconButton onClick={handleMessageClick}>
						<MessageIcon />
					</IconButton>
					<ProfileButton
						name={name.first}
						onClick={handleProfileClick}
					/>
					{menuOpen && <DropdownMenu />}{" "}
					{/* Conditionally render the dropdown menu */}
				</MaterialToolbar>
			</AppBar>
		</Container>
	);
};

export default Toolbar;
