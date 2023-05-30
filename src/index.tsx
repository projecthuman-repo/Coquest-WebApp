import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import Toolbar from "./components/Toolbar";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/theme";
import { Message } from "./pages/Message";
import { Notifications } from "./pages/Notifications";
import "./index.css";
import ItemGrid from "./pages/Inventory/ItemGrid";
import TaskCard from "./components/TaskCard/TaskCardComponent";
import WalletPage from "./pages/Wallet/WalletPage";

import Login from './pages/Login/Login';
import SignUp from './pages/Login/Register/SignUp';
import Verification from './pages/Login/Register/Verification';
import EmailSendAgain from './pages/Login/Register/EmailSendAgain';
import ImproveYourPrivacy from './pages/Login/Register/ImproveYourPrivacy';
import ConnectToSocialMedia from './pages/Login/Register/ConnectToSocialMedia';
import InputDigitCode from './pages/Login/Register/InputDigitCode';
import LetGetYouStarted from './pages/Login/Register/LetGetYouStarted';
import VerifyUserLogin from './pages/Login/VerifyUserLogin';
import WhyAreYouHere from './pages/Login/Register/WhyAreYouHere';
import Interests from './pages/Login/Register/Interests';
import Community from './pages/Login/Register/Community';
import UserProfile from './pages/Login/UserProfile';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import APIReferenceComponent from './components/dataBase/APIReferenceComponent';
import SideBar from './components/LeftSideBar/index';
// Program flow Imports
import {
	BasicInformation,
	Budgeting,
	CreateProgram,
	Operations,
	Promotion,
} from "./pages/Programs/CreateProgram";
import UserProfileInternalView from "./pages/Login/UserProfileInternalView";
import UserProfileExternalView from "./pages/Login/Register/UserProfileExternalView";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([

	{
		path: "/",
		element: <div></div>,
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
		path: '/',
		element: (
			<>
				<TaskCard
					name='Task Name'
					community='Community Name'
					location='Location'
					description='Some text here' hasButton={false} />
				<TaskCard
					name='Task Name'
					community='Community Name'
					location='Location'
					description='Some text here' hasButton={false} />
			</>
		),
	},
	{
		path: '/home',
		element: (
			<div>
				<b>Home</b>
			</div>
		),
	},
	{
		path: "/programs/create",
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
		path: '/Login',
		element: <Login />,
	},
	{
		path: '/Register',
		element: <SignUp />,
	},
	{
		path: '/ConnectToSocial',
		element: <ConnectToSocialMedia />,
	},

	{
		path: '/Verification',
		element: <Verification />,
	},
	{
		path: '/EmailSendAgain',
		element: <EmailSendAgain />,
	},
	{
		path: '/ImproveYourPrivacy',
		element: <ImproveYourPrivacy />,
	},
	{
		path: '/InputDigitCode',
		element: <InputDigitCode />,
	},
	{
		path: '/LetGetYouStarted',
		element: <LetGetYouStarted />,
	},
	{
		path: '/VerifyUserLogin',
		element: <VerifyUserLogin />,
	},
	{
		path: '/WhyAreYouHere',
		element: <WhyAreYouHere />,
	},
	{
		path: '/Interests',
		element: <Interests />,
	},
	{
		path: '/Community',
		element: <Community />,
	},
	{
		path: '/UserProfile',
		element:
			<><Toolbar /><SideBar /><UserProfile /></>,
	},
	{
		path: '/client',
		element: <APIReferenceComponent />,
	},
	{
		path: '/UserProfileInternalView',
		element: <><Toolbar /><SideBar /><UserProfileInternalView /></>,
	},
	{
		path: '/UserProfileExternalView',
		element: <><Toolbar /><SideBar /><UserProfileExternalView /></>,
	}
]);
const Client = new ApolloClient({
	uri: `${process.env.REACT_APP_API_ENDPOINT}?key=${process.env.REACT_APP_API_KEY}`,
	cache: new InMemoryCache(),
});

root.render(
	<React.StrictMode>
		<ApolloProvider client={Client}>
			<ThemeProvider theme={theme}>
				<RouterProvider router={router} />
			</ThemeProvider>
		</ApolloProvider>
	</React.StrictMode>

);
