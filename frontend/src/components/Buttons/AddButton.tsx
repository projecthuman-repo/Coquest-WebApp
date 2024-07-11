import React from "react";
import "./Buttons.css";

function AddButton(props: { onClick?: () => void }) {
	function onClick() {
		props.onClick && props.onClick();
	}
	return (
		<button className="add-button" onClick={onClick}>
			<img src="/icons/plus.png" alt="Plus Sign"></img>
		</button>
	);
}

export default AddButton;
