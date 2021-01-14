import React from 'react';

export interface BotLocation {
        xPos: number,
        yPos: number
}

export interface BotProps {
    location: BotLocation
}

const Bot = ({location: {xPos, yPos}}: BotProps) => {
    return (
        <div style={{
            width: '100px',
            height: '100px',
            backgroundColor: 'red',
            position:'absolute',
            top: `${yPos}px`,
            left: `${xPos}px`
        }}>
        </div>
    )
}

export default Bot;