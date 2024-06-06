import React from 'react';
import './Buttons.css';

function SecondaryButton(props: {name: string}) {
    return (
        <button>{props.name}</button>
    );
};

export default SecondaryButton;