import React from "react";
import "./Buttons.css";

function NextButton(props: { name: string }) {
	return <button className="next-button">{props.name}</button>;
}

export default NextButton;
