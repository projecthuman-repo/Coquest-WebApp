import {
	BrowserRouter,
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/theme";
import { Message } from "./pages/Message";
import { Notifications } from "./pages/Notifications";
import "./index.css";
import ItemGrid from "./pages/Inventory/ItemGrid";
import { Dashboard } from "./pages/Dashboard";
import WalletPage from "./pages/Wallet/WalletPage";
import { Outlet } from "react-router-dom";
import UserProfile from "./pages/Profile/UserProfile"; // Import UserProfile page

// Program flow Imports
import {
	BasicInformation,
	Budgeting,
	CreateProgram,
	Operations,
	Promotion,
} from "./pages/Programs/CreateProgram";
import FinishPage from "./pages/Programs/CreateProgram/FinishPage";

import {
	CreateCoop,
	CoopBasicInformation,
	CoopBudgeting,
	CoopOperations,
	CoopPromotion,
} from "./pages/Coop/CreateCoop";
import EditProfile from "./pages/Programs/EditProfile";
import styled from "@emotion/styled";
import { Orientation } from "./pages/Orientation";
import RemoveNavComponents from "./components/RemoveNavComponents";
import OrientationRedirector from "./pages/Orientation/OrientationRedirector";
import GlobalRedirect from "./components/AutoRedirector/GlobalRedirect";
import { UserRegistrationProvider } from "./components/AutoRedirector/UserRegistration";
import SearchExplore from "./pages/SearchExplore/SearchExplore";

// Communities
import CreateCommunity from "./pages/Community/CreateCommunity/Create";
import CommunityPage from "./pages/Community/CommunityPage";
import CommunityQuests from "./pages/Community/CommunityPage/Quests/Quests";
import CommunityExplore from "./pages/Community/ExplorePage/Explore";

// Posts
import { PostFeedContextProvider } from "./pages/Post/PostFeedContext";
import PostFeed from "./pages/Post/PostFeed";
import CreatePost from "./pages/Post/Create";

// Programs
import { ProgramsContextProvider } from "./pages/Programs/ProgramsContext";
import { ProgramContextProvider } from "./pages/Programs/ProgramPage/ProgramContext";
import ViewAllPrograms from "./pages/Programs";
import ProgramPage from "./pages/Programs/ProgramPage";
import ProgramMembers from "./pages/Programs/ProgramPage/Members";
import ProgramQuests from "./pages/Programs/ProgramPage/Quests/Quests";
import ProgramApplications from "./pages/Programs/ProgramPage/Members/Applications";

// Projects
import { ProjectsContextProvider } from "./pages/Projects/ProjectsContext";
import { ProjectContextProvider } from "./pages/Projects/ProjectPage/ProjectContext";
import ViewAllProjects from "./pages/Projects";
import ProjectPage from "./pages/Projects/ProjectPage";
import ProjectMembers from "./pages/Projects/ProjectPage/Members";
import ProjectQuests from "./pages/Projects/ProjectPage/Quests/Quests";
import ProjectApplications from "./pages/Projects/ProjectPage/Members/Applications";

// Coops
import { CoopsContextProvider } from "./pages/Coop/CoopsContext";
import { CoopContextProvider } from "./pages/Coop/CoopPage/CoopContext";
import CoopPage from "./pages/Coop/CoopPage";
import CoopQuests from "./pages/Coop/CoopPage/Quests/Quests";

import RoleApply from "./pages/Programs/components/RoleApplicationForm/RoleApply";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement,
);

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<UserRegistrationProvider>
				<Dashboard />
			</UserRegistrationProvider>
		),
	},
	{
		path: "/registration",
		element: (
			<UserRegistrationProvider>
				<OrientationRedirector />
			</UserRegistrationProvider>
		),
		children: [
			{
				path: ":id",
				element: <Orientation />,
			},
		],
	},
	{
		path: "/home",
		element: (
			<div>
				<b>Home</b>
			</div>
		),
	},
	{
		path: "/communities",
		element: <Outlet />,
		children: [
			{
				path: "create",
				element: <CreateCommunity />,
			},
			{
				path: ":id",
				element: <CommunityPage />,
			},
			{
				path: ":id/quests",
				element: <CommunityQuests />,
			},
			{
				path: "explore",
				element: <CommunityExplore />,
			},
		],
	},
	{
		path: "/posts",
		element: <Outlet />,
		children: [
			{
				path: "",
				element: (
					<PostFeedContextProvider>
						<PostFeed />
					</PostFeedContextProvider>
				),
			},
			{
				path: "create",
				element: (
					<PostFeedContextProvider>
						<CreatePost />
					</PostFeedContextProvider>
				),
			},
		],
	},
	{
		path: "/programs",
		element: <Outlet />,
		children: [
			{
				path: "",
				element: (
					<ProgramsContextProvider>
						<ViewAllPrograms />
					</ProgramsContextProvider>
				),
			},
			{
				path: ":id",
				element: <Outlet />,
				children: [
					{
						path: "",
						element: (
							<ProgramsContextProvider>
								<ProgramPage />
							</ProgramsContextProvider>
						),
					},
					{
						path: "quests",
						element: (
							<ProgramsContextProvider>
								<ProgramQuests />
							</ProgramsContextProvider>
						),
					},
					{
						path: "members",
						element: <Outlet />,
						children: [
							{
								path: "",
								element: (
									<ProgramsContextProvider>
										<ProgramContextProvider>
											<ProgramMembers />
										</ProgramContextProvider>
									</ProgramsContextProvider>
								),
							},
							{
								path: ":id/apply",
								element: (
									<ProgramsContextProvider>
										<ProgramContextProvider>
											<RoleApply type="program" />
										</ProgramContextProvider>
									</ProgramsContextProvider>
								),
							},
							{
								// TODO: make this route only available for program admins (view who applied for role)
								path: ":id/applications",
								element: (
									<ProgramsContextProvider>
										<ProgramContextProvider>
											<ProgramApplications />
										</ProgramContextProvider>
									</ProgramsContextProvider>
								),
							},
						],
					},
				],
			},
			{
				path: "create",
				element: <CreateProgram />,
				children: [
					{
						path: "basic-information",
						element: <BasicInformation />,
					},
					{
						path: "operations",
						element: <Operations />,
					},
					{
						path: "budgeting",
						element: <Budgeting />,
					},
					{
						path: "promotion",
						element: <Promotion />,
					},
					{
						path: "finish",
						element: <FinishPage />,
					},
				],
			},
			{
				path: "edit",
				element: <Outlet />,
				children: [
					{
						path: "profile",
						element: <EditProfile />,
					},
				],
			},
		],
	},
	{
		path: "/coops",
		element: <Outlet />,
		children: [
			{
				path: ":id",
				element: <Outlet />,
				children: [
					{
						path: "",
						element: (
							<CoopsContextProvider>
								<CoopPage />
							</CoopsContextProvider>
						),
					},
					{
						path: "quests",
						element: (
							<CoopsContextProvider>
								<CoopQuests />
							</CoopsContextProvider>
						),
					},
					{
						path: "members",
						element: <Outlet />,
						children: [
							{
								path: "",
								element: (
									<CoopsContextProvider>
										<CoopContextProvider>
											<ProgramMembers />
										</CoopContextProvider>
									</CoopsContextProvider>
								),
							},
							{
								path: ":id/apply",
								element: (
									<CoopsContextProvider>
										<CoopContextProvider>
											<RoleApply type="program" />
										</CoopContextProvider>
									</CoopsContextProvider>
								),
							},
							{
								// TODO: make this route only available for coop admins (view who applied for role)
								path: ":id/applications",
								element: (
									<CoopsContextProvider>
										<CoopContextProvider>
											<ProgramApplications />
										</CoopContextProvider>
									</CoopsContextProvider>
								),
							},
						],
					},
				],
			},
			{
				path: "create",
				element: <CreateCoop />,
				children: [
					{
						path: "basic-information",
						element: <CoopBasicInformation />,
					},
					{
						path: "operations",
						element: <CoopOperations />,
					},
					{
						path: "budgeting",
						element: <CoopBudgeting />,
					},
					{
						path: "promotion",
						element: <CoopPromotion />,
					},
				],
			},
			{
				path: "edit",
				element: <Outlet />,
				children: [
					{
						path: "profile",
						element: <EditProfile />,
					},
				],
			},
		],
	},
	{
		path: "/message",
		element: <Message />,
	},
	{
		path: "/notifications",
		element: <Notifications />,
	},
	{
		path: "/inventory",
		element: <ItemGrid />,
	},
	{
		path: "/wallet",
		element: <WalletPage />,
	},
	{
		path: "/profile/:userId",
		element: <UserProfile />,
	},
	{
		path: "/profile",
		element: <UserProfile />,
	},
	{
		path: "/explore",
		element: <SearchExplore />,
	},
	{
		path: "/logout",
		element: (
			<UserRegistrationProvider>
				<GlobalRedirect logout={true} />
			</UserRegistrationProvider>
		),
	},
	{
		path: "/projects",
		element: <Outlet />,
		children: [
			{
				path: "",
				element: (
					<ProjectsContextProvider>
						<ViewAllProjects />
					</ProjectsContextProvider>
				),
			},
			{
				path: ":id",
				element: <Outlet />,
				children: [
					{
						path: "",
						element: (
							<ProjectsContextProvider>
								<ProjectPage />
							</ProjectsContextProvider>
						),
					},
					{
						path: "quests",
						element: (
							<ProjectsContextProvider>
								<ProjectQuests />
							</ProjectsContextProvider>
						),
					},
					{
						path: "members",
						element: <Outlet />,
						children: [
							{
								path: "",
								element: (
									<ProjectsContextProvider>
										<ProjectContextProvider>
											<ProjectMembers />
										</ProjectContextProvider>
									</ProjectsContextProvider>
								),
							},
							{
								path: ":id/apply",
								element: (
									<ProjectsContextProvider>
										<ProjectContextProvider>
											<RoleApply type="project" />
										</ProjectContextProvider>
									</ProjectsContextProvider>
								),
							},
							{
								// TODO: make this route only available for program admins (view who applied for role)
								path: ":id/applications",
								element: (
									<ProjectsContextProvider>
										<ProjectContextProvider>
											<ProjectApplications />
										</ProjectContextProvider>
									</ProjectsContextProvider>
								),
							},
						],
					},
				],
			},
		],
	},
]);

const Container = styled("div")({
	width: "100",
});

root.render(
	<Container>
		<React.StrictMode>
			<ThemeProvider theme={theme}>
				<BrowserRouter>
					<UserRegistrationProvider>
						<GlobalRedirect />
						{/* Prevent the user from accessing links to top-level views while registering */}
						<RemoveNavComponents />
					</UserRegistrationProvider>
				</BrowserRouter>
				<RouterProvider router={router} />
			</ThemeProvider>
		</React.StrictMode>
	</Container>,
);
