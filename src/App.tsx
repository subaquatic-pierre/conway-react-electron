import React, { useState} from 'react';
import Bot, {BotLocation} from './components/Bot';

let intervalID: NodeJS.Timeout;

const botOrigin: BotLocation = {x_pos:10,y_pos:10}

function App() {
  const [loopCount, setLoopCount] = useState(0);
  const [running, setRunning] = useState(true);
  const [botPos, setBotPos] = useState(botOrigin)

  const moveBot = (prevLocation: BotLocation): void => {
    
  }

  const gameLogic = () => {
    console.log('Game logic!')
  }

  const loop = () => {
    gameLogic();
    setLoopCount(prev => {
      const newCount = prev + 1;
      console.log(newCount)
      return newCount
    });

  }

  // Stop the loop on a conditional
  if(loopCount >= 5){
    clearInterval(intervalID)
  }

  const handleStartButtonClick = () => {
    intervalID = setInterval(loop, 1000)
    setRunning(true);
  }

  const handleStopButtonClick = () => {
    clearInterval(intervalID);
    setRunning(false);
  }

  const handleResetButtonClick = () => {
    // setBotPos(botOrigin)
    setLoopCount(0);
    console.clear();
  }

  return (
    <div className="App">
      <div style={{
        height:'500px',
        width: '500px',
        position: 'relative'
      }}>
        <Bot location={botPos} />
      </div>
      <div>
        <button onClick={handleStartButtonClick}>Start</button>
        <button onClick={handleStopButtonClick}>Stop</button>
        <button onClick={handleResetButtonClick}>Reset</button>
      </div>
    </div>
  );
}

export default App;
