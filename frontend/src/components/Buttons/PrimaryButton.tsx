import React from "react";
import "./Buttons.css";

function PrimaryButton(props: { name: string }) {
	return <button className="primary-button">{props.name}</button>;
}

export default PrimaryButton;
