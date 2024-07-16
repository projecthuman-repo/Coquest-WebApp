import React, { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useUserRegistration } from "../../components/AutoRedirector/UserRegistration";
import {
	getRegistrationProgress,
	isCompleteRegistration,
} from "../../models/common";

function OrientationRedirector() {
	const { registered, done, authenticated } = useUserRegistration();
	const navigate = useNavigate();

	useEffect(() => {
		// Must check if user is authenticated to ensure `registered` mirrors the user subject's value
		if (done && authenticated) {
			if (!isCompleteRegistration(registered)) {
				navigate(
					`/registration/${getRegistrationProgress(registered)}`,
					{ replace: true },
				);
			} else {
				navigate("/", { replace: true });
			}
		}
		// Note: do not include navigate in the dependancy list
	}, [done, authenticated, registered]);

	// Stop mounting process of Orientation component from overwriting a completely registered profile
	if (authenticated && !isCompleteRegistration(registered)) {
		return <Outlet />;
	} else {
		return null;
	}
}

export default OrientationRedirector;
