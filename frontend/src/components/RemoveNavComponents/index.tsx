import React, { useEffect, useState } from "react";
import Toolbar from "../Toolbar";
import LeftSideBar from "../LeftSideBar";
import { useUserRegistration } from "../AutoRedirector/UserRegistration";
import { isCompleteRegistration } from "../../models/common";

function RemoveNavComponents() {
	const { registered } = useUserRegistration();
	const [canDisplayNav, setCanDisplayNav] = useState(false);

	useEffect(() => {
		// TODO: decouple predicate from implementation
		if (isCompleteRegistration(registered)) {
			setCanDisplayNav(true);
		} else {
			setCanDisplayNav(false);
		}
	}, [registered]);

	if (canDisplayNav) {
		return (
			<div>
				<Toolbar />
				<LeftSideBar />
			</div>
		);
	} else {
		return null; // Return null or any appropriate fallback for '/orientation' path
	}
}

export default RemoveNavComponents;
