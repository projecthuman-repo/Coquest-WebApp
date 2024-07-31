import React from "react";
import "./Buttons.css";

function OutlineButton(props: {
	name: string;
	onClick?: () => void;
	filled?: boolean;
}) {
	function onClick() {
		props.onClick && props.onClick();
	}
	return (
		<button
			onClick={onClick}
			className={`outline-btn ${props.filled ? "outline-btn-filled" : "black-border"}`}
			style={{
				paddingTop: "5px",
				paddingBottom: "5px",
				fontSize: "14px",
				fontWeight: "450",
			}}
		>
			{props.name}
		</button>
	);
}

export default OutlineButton;
