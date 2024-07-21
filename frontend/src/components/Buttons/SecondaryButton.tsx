import React from "react";
import "./Buttons.css";

function SecondaryButton(props: { name: string; onClick?: () => void }) {
	function onClick() {
		props.onClick && props.onClick();
	}
	return <button onClick={onClick}>{props.name}</button>;
}

export default SecondaryButton;
