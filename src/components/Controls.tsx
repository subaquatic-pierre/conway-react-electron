import React from 'react';

interface ControlProps {
    handleStartClick: () => void
    handleStopClick: () => void
    handleResetClick: () => void
}

const Controls: React.FC<ControlProps> = ({handleStartClick, handleStopClick, handleResetClick}: ControlProps) => {
    return (
        <div>
        <h2>Controls</h2>
        <hr/>
            <button onClick={handleStartClick}>Start</button>
            <button onClick={handleStopClick}>Stop</button>
            <button onClick={handleResetClick}>Reset</button>
        </div>
    )
}

export default Controls;