import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserRegistration } from "./UserRegistration";
import { isCompleteRegistration } from "../../models/common";
import { gql } from "graphql-request";
import graphQLClient from "../../apiInterface/client";
import { getTokenQuery } from "@/models/jwt";

const deleteAuthCookieMutation = gql`
	mutation DeleteCookieToken {
		deleteCookieToken {
			response
			code
		}
	}
`;

interface GlobalRedirectProps {
	logout?: boolean;
}

function GlobalRedirect({ logout }: GlobalRedirectProps) {
	const { registered, done, authenticated, setAuthenticated } =
		useUserRegistration();

	const loc = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		if (logout) {
			setAuthenticated(false);
			localStorage.removeItem("userCache");
			graphQLClient.request(deleteAuthCookieMutation);
			return;
		}

		if (
			!authenticated &&
			loc.pathname !== "/login" &&
			loc.pathname !== "/create"
		) {
			// Using navigate(0) with all navigations causes
			// the context to be reset, which is not desired
			// this is a temporary solution to correctly set
			// the auth state on every page change
			// it sends a request to the server, if it gets a
			// response it sets the auth state to true,
			// it does not matter which query I actually send
			// as long as it was a protected route

			graphQLClient
				.request(getTokenQuery)
				.then(() => {
					setAuthenticated(true);
				})
				.catch(() => {
					navigate("/login");
					navigate(0);
				});
			return;
		}

		if (
			authenticated &&
			!isCompleteRegistration(registered) &&
			// Explicitly check for "/registration" pathname to prevent endless reload loop
			loc.pathname !== "/registration"
		) {
			// TODO: replace temporary navigation solution with one that doesn't briefly display originally requested page
			navigate("/registration");
			// Temporary fix: refresh page after navigating to /registration
			// https://stackoverflow.com/a/71642098
			navigate(0);
			return;
		}
	}, [
		done,
		authenticated,
		registered,
		loc,
		navigate,
		setAuthenticated,
		logout,
	]);

	return null;
}

export default GlobalRedirect;
