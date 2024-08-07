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
import ProjectDescription from "./pages/Projects/Description/Description";

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
import ViewAllPrograms from "./pages/Programs";
import styled from "@emotion/styled";
import { Orientation } from "./pages/Orientation";
import RemoveNavComponents from "./components/RemoveNavComponents";
import OrientationRedirector from "./pages/Orientation/OrientationRedirector";
import GlobalRedirect from "./components/AutoRedirector/GlobalRedirect";
import { UserRegistrationProvider } from "./components/AutoRedirector/UserRegistration";
import CreateCommunity from "./pages/Community/Create";
import CommunityDescription from "./pages/Community/Description/Description";
import CommunityQuests from "./pages/Quests/Quests";
import { PostFeedContextProvider } from "./pages/Post/PostFeedContext";
import PostFeed from "./pages/Post/PostFeed";
import CreatePost from "./pages/Post/Create";
import ProgramPage from "./pages/Programs/ProgramPage";
import { ProgramsContextProvider } from "./pages/Programs/ProgramsContext";

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
				element: <CommunityDescription />,
			},
			{
				path: ":id/quests",
				element: <CommunityQuests />,
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
				element: (
					<ProgramsContextProvider>
						<ProgramPage />
					</ProgramsContextProvider>
				),
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
		path: "/pages/Coop",
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
				path: "description",
				element: <ProjectDescription />,
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
