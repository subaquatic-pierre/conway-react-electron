import React, {useState} from 'react';
import { getRandomInt } from '../utils/randomNumber';
import Bot, { BotLocation } from './Bot';

const botOrigin: BotLocation = {xPos:10, yPos:10}

const BotManager: React.FC = () => {
    const [botPos, setBotPos] = useState(botOrigin)

    const moveBot = (prevLocation: BotLocation): void => {
      const randomX: number = getRandomInt(50);
      const randomY: number = getRandomInt(50);
  
      const newPos: BotLocation = {xPos: randomX, yPos: randomY}
  
      setBotPos(prevPos => {
        const newX: number = prevPos.xPos + randomX
        const newY: number = prevPos.yPos + randomY
        return (
          {
            xPos: newX,
            yPos: newY
          }
        )
      })
    }

    
    return (
        <>
        <h2>Bot manager</h2>
        <hr/>
        <Bot location={botPos} />
        </>
    )
}

export default BotManager;
