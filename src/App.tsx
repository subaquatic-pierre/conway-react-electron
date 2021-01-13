import React, { useState} from 'react';
import Bot, {BotLocation} from './components/Bot';

const logLocation = (currPos: BotLocation) => {
  console.log(`Bot Location: X - ${currPos.x_pos}, Y - ${currPos.y_pos}`)
}

const botOrigin: BotLocation = {x_pos:10,y_pos:10}

// Define a global to store the interval when it is active.
let stopWatch: any;

function App() {
  const [loopCount, setLoopCount] = useState(0);
  const [running, setRunning] = useState(true);
  const [botPos, setBotPos] = useState(botOrigin)

  const moveBot = () => {
    logLocation(botPos)
  }

  const loop = () => {
    moveBot();
    setLoopCount(prev => {
      const newCount = prev + 1;
      console.log(newCount)
      return newCount
    });
  }

  const handleStartButtonClick = () => {
    stopWatch = setInterval(loop, 1000)
    setRunning(true);
  }

  const handleStopButtonClick = () => {
    clearInterval(stopWatch);
    setRunning(false);
  }

  const handleResetButtonClick = () => {
    setBotPos(botOrigin)
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
