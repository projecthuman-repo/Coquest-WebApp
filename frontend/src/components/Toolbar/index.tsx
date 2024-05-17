import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import { Button, Toolbar as MaterialToolbar } from "@mui/material";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MessageIcon from "@mui/icons-material/Message";
import NotificationsIcon from "@mui/icons-material/Notifications";
import styled from "@emotion/styled";
import { subscribeToUserModelSubject } from '../../observers/userobserver'; // Ensure this path is correct

const Container = styled.div({
	width: "100%",
});

const Spacer = styled.div({
	width: 5,
});

const ProfileContainer = styled.div({
	display: "flex",
	marginRight: 30,
	gap: 10,
	paddingLeft: 25,
});

const ProfileIcon = styled(AccountCircleIcon)({
	color: "rgba(0, 0, 0, 0.54)",
});

const ProfileButton = ({ name }: { name: string }) => (
	<ProfileContainer>
		<ProfileIcon />
		<Typography>{name}</Typography>
	</ProfileContainer>
);

const Toolbar = () => {
	const [userName, setUserName] = useState("User"); // Default name to "User" until fetched

	useEffect(() => {
		let unsubscribe: (() => void) | null | undefined = null;

		const setupSubscription = async () => {
			unsubscribe = await subscribeToUserModelSubject(user => {
				setUserName(user.name);  // Update to use the 'name' field
			});
		};

		setupSubscription();

		return () => {
			if (unsubscribe) {
				unsubscribe();  // Ensure proper cleanup on component unmount
			}
		};
	}, []);

	return (
		<Container>
			<AppBar>
				<MaterialToolbar>
					<IconButton>
						<NotificationsIcon />
					</IconButton>
					<Spacer />
					<IconButton>
						<MessageIcon />
					</IconButton>

					<ProfileButton name={userName} />
				</MaterialToolbar>
			</AppBar>
		</Container>
	);
};

export default Toolbar;
