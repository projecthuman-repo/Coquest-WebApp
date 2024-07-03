import React from "react";
import styled from "@emotion/styled";
import { colors, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Chip from "@mui/material/Chip";
import { borderRadius } from "@mui/system";

//creating props for user, link and role
export type MemberProps = {
	users: string[];
	showAllLink: string;
	userRole: string[];
};

const Header = styled(Typography)({
	fontWeight: 600,
	padding: 30,
	paddingBottom: 0,
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
	fontSize: "16px",
	lineHeight: "24px",
	color: "#0000000",
});

const ProfileIcon = styled(AccountCircleIcon)({
	color: "#000000",
});

const ListWrapper = styled(List)({
	padding: 10,
	height: 245,
	overflow: "auto",
});

const MembersContainer = styled.div({
	height: "329px",
	width: "100%",
	borderRadius: "10px",
	backgroundColor: "#D9D9D9",
});

const ShowAllLink = styled(Typography)({
	fontWeight: 400,
	fontSize: "7px",
	lineHeight: "10.5px",
	color: "#000000",
});

const handleClick = () => {
	console.info("You clicked the button.");
};

const CustomChip = styled(Chip)({
	backgroundColor: "#F0F0F0",
	fontSize: "6.64px",
	lineHeight: "9.96px",
	fontWeight: 400,
	borderRadius: "13.28px",
});
//maps through data to display user info in the members container

const Members = ({ users, showAllLink, userRole }: MemberProps) => {
	return (
		<>
			<MembersContainer>
				<Header>
					Members
					<ShowAllLink>
						<Link href={showAllLink} color="#000000">
							Show All
						</Link>
					</ShowAllLink>
				</Header>
				<ListWrapper>
					{users.map((user, index) => {
						const userContent = userRole[index];
						return (
							<>
								<ListItem
									style={{
										marginBottom: "10px",
									}}
								>
									<ListItemAvatar>
										<ProfileIcon />
									</ListItemAvatar>
									<ListItemText
										primaryTypographyProps={{
											fontWeight: 600,
											fontSize: "10.62px",
											lineHeight: "15.94px",
											color: "#000000",
										}}
										primary={user}
									/>
									<CustomChip
										label={userContent}
										onClick={handleClick}
									/>
								</ListItem>
								{index !== 3 ? (
									<Divider
										sx={{
											borderBottomWidth: "1.5px",
										}}
										variant="middle"
										component="li"
										color="#B8B8B8"
									/>
								) : null}
							</>
						);
					})}
				</ListWrapper>
			</MembersContainer>
		</>
	);
};

export default Members;
