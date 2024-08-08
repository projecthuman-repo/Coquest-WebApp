import React from "react";
import "./ProgramProgressBar.css";

interface ProgramProgressBarProps {
	seeHistory: boolean;
	progress?: number;
}

function ProgramProgressBar({ seeHistory, progress }: ProgramProgressBarProps) {
	return (
		<>
			<div className="ppb-heading-container">
				<h2 className="ppb-heading-bold">Progress</h2>
				<p className="ppb-heading">
					{progress ? `${progress}%` : "0%"}
				</p>
			</div>
			<div className="ppb-progress-bar">
				<div
					className="progress-bar-fill"
					style={{ width: `${progress}%` }}
				></div>
			</div>
			{seeHistory && (
				<a href="/" className="ppb-link">
					See History
				</a>
			)}
		</>
	);
}

export default ProgramProgressBar;
