import React from 'react';
import './Loading.css';

function Loading() {
    return (
        <div className="loading-container">
            <p>Loading...</p>
            <div>
                <div className='circle'></div>
                <div className='circle'></div>
                <div className='circle'></div>
                <div className='circle'></div>
                <div className='circle'></div>
                <div className='circle'></div>
                <div className='circle'></div>
                <div className='circle'></div>
                <div className='circle'></div>
                <div className='circle'></div>
            </div>
        </div>
    );
}

export default Loading;