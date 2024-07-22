import React from "react";
import "./ProgramProgressBar.css";

function ProgramProgressBar({ seeHistory }: { seeHistory: boolean }) {

	return (
		<>
        <div className="ppb-heading-container">
            <h2 className="ppb-heading-bold">Progress</h2>
            <p className="ppb-heading">0%</p>
        </div>
        <div className="ppb-progress-bar">
            <div className="progress-bar-fill"></div>
        </div>
        {seeHistory && <a href="/" className="ppb-link">See History</a>}
		</>
	);
}

export default ProgramProgressBar;