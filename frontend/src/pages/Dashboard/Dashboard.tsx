import React, { useEffect, useState } from "react";
import WelcomeMessage from "../../components/WelcomeMessage";
import SearchBar from "../../components/SearchBar";
import SimpleCard from "../../components/SimpleCard/SimpleCard";
import styled from "@emotion/styled";
import MyTasksContainer from "../../components/MyTasksContainer";
import Maps from "../../components/Maps/Maps";
import CommunityTasks from "../../components/CommunityTasks";
import Members from "../../components/Members";
import ExtendedSimpleCard from "../../components/ExtendedSimpleCard/SimpleCard";
import { subscribeToUserModelSubject } from "../../observers/userobserver";
import { Name } from "../../models/usermodel";

const Container = styled("div")({
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	marginBottom: 100,
	justifyContent: "center",
});

const Header = styled("div")({
	width: "90%",
	padding: 20,
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
});

const CardCont = styled.div({
	display: "flex",
	flexDirection: "column",
	gap: 10,
	marginBottom: 10,
	width: "100%",
});

const DashColumns = styled("div")({
	display: "flex",
	width: "93%",
	height: 650,
	overflow: "hidden",
	"@media (max-width: 600px)": {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		height: "100%",
		justifyContent: "center",
	},
});

const DashColumn = styled.div({
	width: "100%",
	padding: 10,
	height: "100%",
});

const Footer = styled("div")({
	width: "93%",
	display: "flex",
	marginTop: 20,
	"@media (max-width: 600px)": {
		flexDirection: "column",
		alignItems: "center",
		height: "100%",
		width: "100%",
		justifyContent: "center",
	},
});

const CommunityTaskContainer = styled("div")({
	width: "66%",
	"@media (max-width: 600px)": {
		width: "100%",
	},
});

const MembersContainer = styled("div")({
	width: "33%",
	"@media (max-width: 600px)": {
		padding: 10,
		width: "95%",
	},
});

// Styled component to ensure the map container has consistent height and width
const MapsContainer = styled.div({
	flex: 1,
	display: "flex",
	flexDirection: "column",
	height: "95.7%",
	borderRadius: "10px",
	overflow: "hidden",
	// Ensure the map takes the full height of its container
	"& .leaflet-container": {
		flex: 1,
		height: "100%",
		width: "100%",
	},
});

function Dashboard() {
	const [name, setName] = useState<Name>({
		first: "",
		last: "",
	});

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
				unsubscribe();
			}
		};
	}, []);

	const members = [name.first]; // List of members with the current user

	return (
		<Container>
			<Header>
				<WelcomeMessage
					name={name.first || "User"}
					communityName="Community name"
				/>
				<SearchBar />
			</Header>
			<DashColumns>
				<DashColumn>
					<CardCont>
						<SimpleCard label="Community overview" />
						<SimpleCard label="My projects" />
						<SimpleCard label="Open projects" />
					</CardCont>
					<ExtendedSimpleCard label="Posts" />
				</DashColumn>
				<DashColumn>
					<MyTasksContainer label="My Tasks" seeAllLink="#" />
				</DashColumn>
				<DashColumn>
					<MapsContainer>
						<Maps />
					</MapsContainer>
				</DashColumn>
			</DashColumns>
			<Footer>
				<CommunityTaskContainer>
					<CommunityTasks label="Community Tasks" seeAllLink="#" />
				</CommunityTaskContainer>
				<MembersContainer>
					<Members
						users={members} // Pass the list of members
						userRole={["Role"]} // Placeholder for user roles, you can expand this in the future
						showAllLink="#"
					/>
				</MembersContainer>
			</Footer>
		</Container>
	);
}

export default Dashboard;
