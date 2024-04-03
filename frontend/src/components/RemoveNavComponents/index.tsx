import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Toolbar from "../Toolbar";
import LeftSideBar from "../LeftSideBar";
import { useUserRegistration } from "../AutoRedirector/UserRegistration";
import { isCompleteRegistration } from "../../models/common";

type RemoveNavComponentsProps = {
    // The location to refrain displaying navigation components
    pathPrefix: string;
}

function RemoveNavComponents(props: RemoveNavComponentsProps) {
    const { registered } = useUserRegistration();
    const loc = useLocation();
    const [canDisplayNav, setCanDisplayNav] = useState(false);

    useEffect(() => {
        // TODO: decouple predicate from implementation
        if(isCompleteRegistration(registered) && !loc.pathname.startsWith(props.pathPrefix)) {
            setCanDisplayNav(true);
        } else {
            setCanDisplayNav(false);
        }
    }, [loc, registered]);

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
