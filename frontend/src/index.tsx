import { BrowserRouter, createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import Toolbar from "./components/Toolbar";
import LeftSideBar from "./components/LeftSideBar";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/theme";
import { Message } from "./pages/Message";
import { Notifications } from "./pages/Notifications";
import "./index.css";
import ItemGrid from "./pages/Inventory/ItemGrid";
import { Dashboard } from "./pages/Dashboard";
import WalletPage from "./pages/Wallet/WalletPage";
import { Outlet } from "react-router-dom";

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
import { EditProfile } from "./pages/Programs/EditProfile";
import { ProgramView } from "./pages/Programs/ProgramView";
import styled from "@emotion/styled";
import { Orientation } from "./pages/Orientation";
import RemoveNavComponents from "./components/RemoveNavComponents";
import OrientationRedirector from "./pages/Orientation/OrientationRedirector";
import GlobalRedirect from "./components/AutoRedirector/GlobalRedirect";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
	{
		path: "/",
		element: <Dashboard />,
	},
	{
		path: "/registration",
		element: <OrientationRedirector />,
	},
	{
		path: "/registration/:id",
		element: <Orientation />
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
		path: "/programs",
		element: (
			<>
				<Outlet />
			</>
		),
		children: [
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
			{
				path: "view",
				element: <ProgramView />,
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
]);

const Container = styled("div")({
	width: "100",
});

root.render(
	<Container>
		<React.StrictMode>
			<ThemeProvider theme={theme}>
				<BrowserRouter>
					<GlobalRedirect />
					{/* Prevent the user from accessing links to top-level views while registering */}
					<RemoveNavComponents pathPrefix="/registration" />
				</BrowserRouter>
				<RouterProvider router={router} />
			</ThemeProvider>
		</React.StrictMode>
	</Container>
);
