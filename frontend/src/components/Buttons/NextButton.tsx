import React from "react";
import "./Buttons.css";

function NextButton(props: {name: string}) {
    return (
        <div className="next-button">
            <p className='next-button-text'>{props.name}</p>
        </div>
    );
}

export default NextButton;
