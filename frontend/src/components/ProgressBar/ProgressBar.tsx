import React from 'react';
import './ProgressBar.css';

interface ProgressBarProps {
    numOfSteps: number;
}

function ProgressBar({ numOfSteps }: ProgressBarProps) {
    return (
        <div className='progress-bar'>
            {Array.from({ length: numOfSteps }).map((_, index) => (
                <div key={index} className="circle" style={{ width: `calc(100% / ${numOfSteps})` }}></div>
            ))}
        </div>
    );
}

export default ProgressBar;
