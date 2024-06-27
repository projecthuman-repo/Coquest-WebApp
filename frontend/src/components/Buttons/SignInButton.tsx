import React from 'react';
import SecondaryButton from './SecondaryButton';
import './Buttons.css';

function SignInButton() {
    return (
        <button className="sign-in-button">
            <img src="/icons/avatar.png" height="20" alt="Sign In Avatar Icon"></img>
            <SecondaryButton name="Sign In" />
        </button>
    );
};

export default SignInButton;