import React from 'react';
import './ProgressBar.css';

interface ProgressBarProps {
    numOfPages: number;
    currentPageNum: number;
}

function ProgressBar({ numOfPages, currentPageNum }: ProgressBarProps) {
    return (
        <div className='progress-bar'>
            <div className='completed' style={{ width: `calc(100% / ${numOfPages} * ${currentPageNum})` }}>
                <small>{Math.round(100 / numOfPages * currentPageNum)}% done</small>
            </div>
        </div>
    );
}

export default ProgressBar;
