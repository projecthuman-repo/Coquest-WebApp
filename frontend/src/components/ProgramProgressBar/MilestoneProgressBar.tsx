import React, { useEffect, useState } from "react";
import "./MilestoneProgressBar.css";

interface MilestoneProgressBarProps {
	progress: number;
}

function MilestoneProgressBar({ progress }: MilestoneProgressBarProps) {
	const [progressText, setProgressText] = useState("");

	useEffect(() => {
		setProgressText(`Progress: ${progress}%`);
		if (progress == 100) setProgressText("Completed");
		if (progress == 0) setProgressText("Not Started");
	}, [progress]);

	return (
		<div className="mpb-container">
			<p className="mpb-heading-bold">{progressText}</p>
			<div className="mpb-progress-bar">
				<div
					className="mpb-progress-bar-fill"
					style={{ width: `${progress}%` }}
				></div>
			</div>
		</div>
	);
}

export default MilestoneProgressBar;
