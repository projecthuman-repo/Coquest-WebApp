import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { subscribeToUserModelSubject } from "../../observers/userobserver";
import { Name, User } from "../../models/usermodel";
import { useUserRegistration } from "../../components/AutoRedirector/UserRegistration";
import Loading from "../../components/Loading";
import { isCompleteRegistration } from "../../models/common";
import "./Dashboard.css";
import Maps from "../../components/Maps/Maps";
import Members from "../../components/Members";

function Dashboard() {
	// Authentication/Registration State Variables
	// [isRegistered] - Boolean value that determines if the user has completed the registration process.
	// [setRegisteredStatus] - Function that sets the value of isRegistered.
	// [authenticated] - Boolean value that determines if the user is authenticated.
	const [isRegistered, setRegisteredStatus] = useState(false);
	const { authenticated } = useUserRegistration();

	// User State Variables (Stores the information about the user)
	// [name] - Object that stores the user's name.
	// [setName] - Function that sets the value of the name object.
	// [user] - Object that stores the user's information.
	const [name, setName] = useState<Name>({
		first: "",
		last: "",
	});
	const [user, setUser] = useState<User | undefined>();

	// Current Communtiy State Variables (Stores the information about the current community the user has selected)
	// [currentCommunity] - Object that stores the information about the current community.
	// [setCurrentCommunity] - Function that sets the value of the currentCommunity object.
	const [currentCommunity, setCurrentCommunity] = useState<any>();

	// UseEffect for fetching User Data
	// Sets the user state variables to the user data fetched from the UserModel.
	useEffect(() => {
		let unsubscribe: (() => void) | null | undefined = null;

		const setupSubscription = async () => {
			unsubscribe = await subscribeToUserModelSubject((user) => {
				setName(user.name);
				setRegisteredStatus(isCompleteRegistration(user.registered));
				setUser(user);
				setCurrentCommunity(user?.communities?.[0]);
			});
		};
		setupSubscription();
		return () => {
			if (unsubscribe) {
				unsubscribe();
			}
		};
	}, []);

	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		console.log(user);

		const communities = user?.communities;

		communities?.forEach((community) => {

			if (community.objValue.id === event.target.value) {
				console.log(community)
				setCurrentCommunity(community);
			}

		});

	};

	useEffect(() => {
		console.log(currentCommunity);
		// Add any additional logic that should run when currentCommunity changes
	  }, [currentCommunity]);

	const navigate = useNavigate();

	return authenticated && isRegistered ? (
		<>
			<div className="dashboard-container">
			{currentCommunity ? (
				<>
				<div className="db-heading-container">
					<div>
						<p className="db-sub-heading">Welcome, {name.first}!</p>
						<h2 className="db-main-heading">Overview</h2>
							<div className="db-dropdown-container">
								<label></label>
								<select
									id="dropdown"
									className="db-dropdown"
									onChange={handleChange}
								>
									{user?.communities?.map((community) => (
										<option
											key={community.objValue.id}
											value={community.objValue.id}
										>
											{community.objValue.name}
										</option>
									))}
								</select>
							</div>

					</div>
					<div className="search-container">
						<input
							type="search"
							className="search"
							name="search"
							placeholder="Search Nearby"
						/>
						<img
							src="https://cdn1.iconfinder.com/data/icons/hawcons/32/698627-icon-111-search-512.png"
							alt="search-icon"
							className="search-icon"
						/>
					</div>
				</div>
				<div className="db-widgets-container">
					<div>
						{/* Community Overview */}
						<div className="db-widget-small">
							<div className="db-flex-container">
								<h2 className="db-widget-heading-small">
									Community Overview
								</h2>
								<button
									onClick={() =>
										navigate(
											`/communities/${currentCommunity?.objValue.id}`,
										)
									}
								>
									<img
										src="icons/next-button-chevron.png"
										alt="search-icon"
									/>
								</button>
							</div>
						</div>
						{/* My Projects */}
						<div className="db-widget-small">
							<div className="db-flex-container">
								<h2 className="db-widget-heading-small">
									My Projects
								</h2>
								<button
									onClick={() =>
										navigate(
											`/communities/${currentCommunity?.objValue.id}`,
										)
									}
								>
									<img
										src="icons/next-button-chevron.png"
										alt="Next-Button"
									/>
								</button>
							</div>
						</div>
						{/* Open Projects */}
						<div className="db-widget-small">
							<div className="db-flex-container">
								<h2 className="db-widget-heading-small">
									Open Projects
								</h2>
								<button
									onClick={() =>
										navigate(
											`/communities/${currentCommunity?.objValue.id}`,
										)
									}
								>
									<img
										src="icons/next-button-chevron.png"
										alt="search-icon"
									/>
								</button>
							</div>
						</div>
						{/* Posts */}
						<div className="db-widget">
							<div className="db-flex-container">
								<h2 className="db-widget-heading">Posts</h2>
								<button
									onClick={() =>
										navigate(
											`/communities/${currentCommunity?.objValue.id}`,
										)
									}
								>
									<img
										src="icons/next-button-chevron.png"
										alt="search-icon"
									/>
								</button>
							</div>
							<div className="db-posts-container">
								<div className="db-posts-placeholder"></div>
								<div className="db-posts-placeholder"></div>
								<div className="db-posts-placeholder"></div>
								<div className="db-posts-placeholder"></div>
								<div className="db-posts-placeholder"></div>
								<div className="db-posts-placeholder"></div>
								<div className="db-posts-placeholder"></div>
								<div className="db-posts-placeholder"></div>
								<div className="db-posts-placeholder"></div>
							</div>
						</div>
					</div>
					{/* My Tasks */}
					<div className="db-widget">
						<div className="db-flex-container">
							<h2 className="db-widget-heading">My Tasks</h2>
							<a href="/" className="db-widget-link">
								See All
							</a>
						</div>
						<div className="db-tasks-container">
							<p>You have no tasks yet.</p>
							<button className="db-tasks-find-button">
								Find Available Tasks
							</button>
						</div>
					</div>
					{/* Location/Map */}
					<div className="db-widget-map">
						<Maps lat={currentCommunity?.objValue.location.lat} long={currentCommunity?.objValue.location.lng} mapZoom={14} mapKey={currentCommunity?.objValue.id}/>
					</div>
				</div>
				<div className="db-widgets-container">
					{/* Community Tasks */}
					<div className="db-widget-community-tasks">
						<h2 className="db-widget-heading">Community Tasks</h2>
					</div>
					{/* Members */}
					<div className="db-widget">
						<Members
							users={[name.first, name.first, name.first]}
							userRole={["Role", "Role", "Role"]}
							showAllLink="#"
						/>
					</div>
				</div>
				</>
				) : (
				<p>No Communities Found!</p>
				)}
			</div>
		</>
	) : (
		<Loading />
	);
}

export default Dashboard;
