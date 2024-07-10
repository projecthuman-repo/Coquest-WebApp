import React from "react";
import "./Buttons.css";

function PrimaryButton(props: { name: string; onClick?: () => void }) {
	function onClick() {
		props.onClick && props.onClick();
	}
	return (
		<button className="primary-button" onClick={onClick}>
			{props.name}
		</button>
	);
}

export default PrimaryButton;
