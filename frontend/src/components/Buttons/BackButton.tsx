import React from "react";
import "./Buttons.css";

function BackButton() {
	return (
		<button className="back-button">
			<img
				src="/icons/back-button-chevron.png"
				height="12"
				alt="Back Button Chevron"
			></img>
			Back
		</button>
	);
}

export default BackButton;
