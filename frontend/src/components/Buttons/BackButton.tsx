import React from "react";
import SecondaryButton from "./SecondaryButton";
import "./Buttons.css";

function BackButton(props: { onClick?: () => void }) {
	function onClick() {
		props.onClick && props.onClick();
	}

	return (
		<div
			className="back-button"
			onClick={onClick}
			style={{ cursor: "pointer" }}
		>
			<SecondaryButton name="< Back" />
		</div>
	);
}

export default BackButton;
