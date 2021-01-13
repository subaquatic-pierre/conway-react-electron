import React from 'react';

export interface BotLocation {
        x_pos: number,
        y_pos: number
}

export interface BotProps {
    location: BotLocation
}

const Bot = ({location: {x_pos, y_pos}}: BotProps) => {
    return (
        <div style={{
            width: '100px',
            height: '100px',
            backgroundColor: 'red',
            position:'absolute',
            top: `${y_pos}px`,
            left: `${x_pos}px`
        }}>
        </div>
    )
}

export default Bot;