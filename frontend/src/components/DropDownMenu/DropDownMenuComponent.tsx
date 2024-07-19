import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import WalletIcon from "@mui/icons-material/AccountBalanceWallet";
import InventoryIcon from "@mui/icons-material/Inventory";
import TicketsIcon from "@mui/icons-material/ConfirmationNumber";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { subscribeToUserModelSubject } from "../../observers/userobserver"; // Ensure this path is correct
import { Name } from "../../models/usermodel";

const DropdownContainer = styled.div({
	position: "absolute",
	top: "60px",
	right: "10px",
	width: "200px",
	border: "1px solid #dcdcdc",
	borderRadius: "10px",
	backgroundColor: "#fff",
	boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
	zIndex: 1000,
	padding: "10px",
});

const ProfileSection = styled.div({
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	marginBottom: "10px",
});

const ProfileIcon = styled(AccountCircleIcon)({
	fontSize: "40px",
	marginBottom: "5px",
	color: "#666666",
});

const ProfileName = styled.div({
	fontSize: "16px",
	fontWeight: "bold",
	marginBottom: "10px",
});

const ProfileLink = styled.div({
	fontSize: "14px",
	color: "#000",
	textDecoration: "none",
	marginBottom: "10px",
	cursor: "pointer",
	"&:hover": {
		textDecoration: "underline",
	},
});

const Divider = styled.div({
	width: "100%",
	height: "1px",
	backgroundColor: "#dcdcdc",
	margin: "10px 0",
});

const MenuItem = styled.div({
	display: "flex",
	alignItems: "center",
	padding: "8px 0",
	textDecoration: "none",
	fontSize: "14px",
	color: "#000", // Updated to black color for the text
	cursor: "pointer",
	"&:hover": {
		backgroundColor: "rgba(0, 0, 0, 0.05)",
		borderRadius: "10px",
		padding: "10px",
	},
});

const MenuItemIcon = styled.div({
	marginRight: "10px",
	color: "#666666", // Ensure the icon color stays grey
});

const DropdownMenu = () => {
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

	const handleNavigation = (path: string) => {
		navigate(path);
		window.location.reload();

		// Future implementation without reload:
		// navigate(path);
	};

	return (
		<DropdownContainer>
			<ProfileSection>
				<ProfileIcon />
				<ProfileName>{name.first}</ProfileName>
				<ProfileLink onClick={() => handleNavigation("/profile")}>
					View Profile
				</ProfileLink>
			</ProfileSection>
			<Divider />
			<MenuItem onClick={() => handleNavigation("/wallet")}>
				<MenuItemIcon>
					<WalletIcon />
				</MenuItemIcon>
				Wallet
			</MenuItem>
			<MenuItem onClick={() => handleNavigation("/inventory")}>
				<MenuItemIcon>
					<InventoryIcon />
				</MenuItemIcon>
				Inventory
			</MenuItem>
			<MenuItem onClick={() => handleNavigation("/tickets")}>
				<MenuItemIcon>
					<TicketsIcon />
				</MenuItemIcon>
				Tickets
			</MenuItem>
			<MenuItem onClick={() => handleNavigation("/settings")}>
				<MenuItemIcon>
					<SettingsIcon />
				</MenuItemIcon>
				Settings
			</MenuItem>
			<MenuItem onClick={() => handleNavigation("/logout")}>
				<MenuItemIcon>
					<LogoutIcon style={{ color: "red" }} />
				</MenuItemIcon>
				<span style={{ color: "red" }}>Logout</span>
			</MenuItem>
		</DropdownContainer>
	);
};

export default DropdownMenu;
