import React, { useState } from 'react';
import { getRandomInt } from './utils/randomNumber';
import Map from './components/Map'
import Controls from './components/Controls';

let intervalID: NodeJS.Timeout;

const botOrigin: BotLocation = {xPos:10, yPos:10}

const App: React.FC = () => {
  const [loopCount, setLoopCount] = useState(0);
  const [running, setRunning] = useState(true);

  const gameLogic = () => {
    moveBot(botPos)
  }

  const loop = () => {
    gameLogic();
    setLoopCount(prev => prev + 1);
  }

  // Stop the loop on a conditional
  // if(loopCount >= 20){
  //   clearInterval(intervalID)
  // }

  const handleStartButtonClick = () => {
    intervalID = setInterval(loop, 1000)
    setRunning(true);
  }

  const handleStopButtonClick = () => {
    clearInterval(intervalID);
    setRunning(false);
  }

  const handleResetButtonClick = () => {
    setBotPos(botOrigin)
    setLoopCount(0);
    console.clear();
  }

  return (
    <div className="App">
        <Map />
        <Controls 
        handleStartClick={handleStartButtonClick}
        handleStopClick={handleStopButtonClick}
        handleResetClick={handleResetButtonClick}
        />
      </div>
  );
}

export default App;
