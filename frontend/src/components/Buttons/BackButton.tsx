import React from 'react';
import './Buttons.css';

function BackButton() {
    return (
        <div className="back-button">
            <img src="/icons/back-button-chevron.png" height="12" alt="Back Button Chevron"></img>
            <p className='back-button-text'>Back</p>
        </div>
    );
};

export default BackButton;