import { useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useUserRegistration } from "./UserRegistration";
import { isCompleteRegistration } from "../../models/common";
import { gql } from "graphql-request";
import graphQLClient from "../../apiInterface/client";

const setAuthCookieMutation = gql`
	mutation SetCookieWithToken($token: String!) {
		setCookieWithToken(token: $token) {
			response
			code
		}
	}
`;

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

	// TODO: replace token exchange mechanism with PKCE
	const [searchParams] = useSearchParams();
	const token = searchParams.get("token");

	// Improved Integration with Authentication Flow
	// useEffect(() => {
	//     // Check if process is done and user is not yet authenticated
	//     if (done && !authenticated) {
	//         if (token) {
	//             console.log('setting cookie with token', token);
	//             graphQLClient.request(setAuthCookieMutation, { token: token })
	//                 .then(() => {
	//                     setAuthenticated(true);
	//                     // After setting authenticated, redirect away or reset the URL to clean the token
	//                     navigate('/path-after-auth', { replace: true });  // Adjust the path as needed
	//                 })
	//                 .catch((error) => {
	//                     console.error('Authentication error:', error);
	//                     // Handle error, maybe navigate to an error page or login page
	//                     navigate('/login', { replace: true });
	//                 });
	//         } else {
	//             // Redirect to authentication URI
	//             window.location.href = `${process.env.REACT_APP_AUTH_URI}?appId=2`;
	//         }
	//     } else if (authenticated && !isCompleteRegistration(registered) && loc.pathname !== "/registration") {
	//         navigate('/registration', { replace: true });
	//     }
	// }, [done, authenticated, registered, token, loc, navigate]);

	useEffect(() => {
		if (logout && logout === true) {
			graphQLClient.request(deleteAuthCookieMutation).then(() => {
				setAuthenticated(false);
			});
		} else if (done) {
			if (!authenticated) {
				if (token) {
					console.log("setting cookie with token", token);
					graphQLClient
						.request(setAuthCookieMutation, { token: token })
						.then(() => {
							setAuthenticated(true);
						});
				} else {
					// TODO: dynamically fetch appId from DB
					window.location.href = `${process.env.REACT_APP_AUTH_URI}?appId=2`;
				}
				// Explicitly check for "/registration" pathname to prevent endless reload loop
			} else if (
				!isCompleteRegistration(registered) &&
				loc.pathname !== "/registration"
			) {
				// TODO: replace temporary navigation solution with one that doesn't briefly display originally requested page
				navigate("/registration", { replace: true });
				// Temporary fix: refresh page after navigating to /registration
				// https://stackoverflow.com/a/71642098
				navigate(0);
			}
		}
	}, [
		done,
		authenticated,
		registered,
		token,
		loc,
		navigate,
		setAuthenticated,
		logout,
	]);

	return null;
}

export default GlobalRedirect;
