import React from "react";
import SecondaryButton from "./SecondaryButton";
import "./Buttons.css";

function DeleteButton(props: { onClick?: () => void }) {
	function onClick() {
		props.onClick && props.onClick();
	}

	return (
		<div
			className="back-button delete-button"
			onClick={onClick}
			style={{ cursor: "pointer" }}
		>
			<img src="/icons/delete.png" alt="Delete Icon"></img>
			<SecondaryButton name="Delete" />
		</div>
	);
}

export default DeleteButton;
