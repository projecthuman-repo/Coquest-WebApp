import React from "react";
import { useLocation } from "react-router-dom";
import Toolbar from "../Toolbar";
import LeftSideBar from "../LeftSideBar";

type RemoveNavComponentsProps = {
    // The location to refrain displaying navigation components
    pathPrefix: string;
}

function RemoveNavComponents(props: RemoveNavComponentsProps) {
    const loc = useLocation();

    if (!loc.pathname.startsWith(props.pathPrefix)) {
        return (
            <div>
                <Toolbar />
                <LeftSideBar />
            </div>
        );
    }

    return null; // Return null or any appropriate fallback for '/orientation' path
}

export default RemoveNavComponents;
