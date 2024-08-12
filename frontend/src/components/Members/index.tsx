import React from "react";
import styled from "@emotion/styled";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./index.css";

// Creating Props for users, showAllLink and userRole
export type MemberProps = {
	users: string[];
	showAllLink: string;
	userRole: string[];
};

// Styling for Profile Icon
const ProfileIcon = styled(AccountCircleIcon)({
	color: "#000000",
});

const Members = ({ users, showAllLink, userRole }: MemberProps) => {
	return (
		<>
			<div className="ppb-heading-container">
				<h2 className="members-heading">Members</h2>
				<a href={showAllLink} className="members-link">
					See All
				</a>
			</div>
			{users.map((user, index) => {
				const userContent = userRole[index];
				return (
					<div key={index} className="members-container">
						<div className="members-left">
							<ProfileIcon className="margin-right" />
							<p>{user}</p>
						</div>
						<button className="members-button-design">
							{userContent}
						</button>
					</div>
				);
			})}
		</>
	);
};

export default Members;
