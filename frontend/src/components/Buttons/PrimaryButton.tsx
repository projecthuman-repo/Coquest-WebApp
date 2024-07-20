import React from "react";
import "./Buttons.css";

// type: muted (button with muted color)
function PrimaryButton(props: {
	name: string;
	type?: string;
	onClick?: () => void;
}) {
	function onClick() {
		props.onClick && props.onClick();
	}
	return (
		<button className={`primary-button ${props.type}`} onClick={onClick}>
			{props.name}
		</button>
	);
}

export default PrimaryButton;
