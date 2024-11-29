import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { styled } from "@mui/system";
import { Outlet } from "react-router-dom";
import { useLocation, Link } from "react-router-dom";
import ProgressStepper from "../CoopComponents/ProgressStepper";
import { CoopInput } from "@/__generated__/graphql";
import { subscribeToUserModelSubject } from "@/observers/userobserver";
import graphQLClient from "@/apiInterface/client";
import { CREATE_COOP_MUTATION } from "@/apiInterface/gqlStrings/coopStrings";

const Container = styled("div")({
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	flexDirection: "column",
});

const NavigateButtons = styled("div")({
	width: "100%",
	display: "flex",
	justifyContent: "end",
	marginTop: 28,
	marginRight: 73,
	"& button:hover": {
		backgroundColor: "#c7c5c5",
	},
});

const ProgressBarContainer = styled("div")({
	marginTop: 40,
	minWidth: 300,
	width: "60vw",
	maxWidth: 700,
});

const BackButton = styled(Button)({
	color: "black",
	fontWeight: 700,
	textTransform: "none",
	fontSize: 16,
	borderRadius: 30,
});

const NextButton = styled(Button)({
	marginLeft: 40,
	backgroundColor: "rgb(217, 217, 217)",
	color: "black",
	fontWeight: 700,
	textTransform: "none",
	fontSize: 16,
	borderRadius: 30,
});
const getCurrPath = (fullpath: string) => {
	return fullpath.substring(17, fullpath.length);
};

export type CoopCreateData = Partial<CoopInput>;

export interface CreateCoopOutletContext {
	createCoopData: CoopCreateData;
	updateCreateCoopData: (data: CoopCreateData) => void;
	handleSubmit: () => void;
}

export interface CreateCoopProps {
	createCoopData: CoopCreateData;
	updateCreateCoopData: (data: CoopCreateData) => void;
}

const CreateCoop = () => {
	const location = useLocation();
	const [pageIndex, setPageIndex] = useState(0);
	const [currentPath, setCurrentPath] = useState(
		getCurrPath(location.pathname),
	);
	const paths = ["basic-information", "operations", "budgeting", "promotion"];
	const [createCoopData, setCreateCoopData] = useState<CoopInput>({
		userID: "", // This has been populated in the useEffect that subscribes to the user model
		name: "",
		/*
		The above properties are placeholders for the required properties of the Coop model.
		These properties will be updated later.
		Other optional properties will be added by other components
		*/
	});

	const updateCreateCoopData = (data: CoopCreateData) => {
		setCreateCoopData({ ...createCoopData, ...data });
	};

	useEffect(() => {
		setPageIndex(paths.indexOf(currentPath));
	}, []);

	useEffect(() => {
		let unsubscribe: (() => void) | null | undefined = null;

		const setupSubscription = async () => {
			unsubscribe = await subscribeToUserModelSubject((user) => {
				// Updating the userID in the createCoopData
				updateCreateCoopData({ userID: user.id });
			});
		};
		setupSubscription();
		return () => {
			if (unsubscribe) {
				unsubscribe();
			}
		};
	}, []);

	const handleSubmit = () => {
		console.log(createCoopData);
		// Add the mutation here
		if (!createCoopData.userID || !createCoopData.name) {
			console.log("UserId: ", createCoopData.userID, " is required");
			console.log("Name: ", createCoopData.name, " is required");
			return;
		}
		graphQLClient
			.request(CREATE_COOP_MUTATION, {
				userInput: createCoopData,
			})
			.then((data) => {
				console.log(data);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const outletContext: CreateCoopOutletContext = {
		createCoopData,
		updateCreateCoopData,
		handleSubmit,
	};

	console.log(currentPath);

	return (
		<Container>
			<ProgressBarContainer>
				<ProgressStepper pgnum={pageIndex} />
			</ProgressBarContainer>
			<NavigateButtons>
				{pageIndex > 0 && (
					<Link
						style={{ textDecoration: "none" }}
						to={`${paths[pageIndex - 1]}`}
						onClick={() => {
							setCurrentPath(getCurrPath(location.pathname));
							setPageIndex(pageIndex - 1);
						}}
					>
						<BackButton>{"<"} Back</BackButton>
					</Link>
				)}
				{pageIndex < paths.length - 1 && (
					<Link
						style={{ textDecoration: "none" }}
						to={`${paths[pageIndex + 1]}`}
						onClick={() => {
							setCurrentPath(getCurrPath(location.pathname));
							console.log(pageIndex);
							setPageIndex(pageIndex + 1);
						}}
					>
						<NextButton variant="contained" disableElevation>
							Next
						</NextButton>
					</Link>
				)}
			</NavigateButtons>
			<Outlet context={outletContext} />
		</Container>
	);
};

export default CreateCoop;
