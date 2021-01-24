import React from "react";
import { BotContext, GameContext } from "../../App";

export const GameStats: React.FC = () => {
  const { botState } = React.useContext(BotContext);
  const { gameState } = React.useContext(GameContext);

  return (
    <div>
      <h2>Game Stats</h2>
      <hr />
      <div className="panel">
        <ul>
          <li>Number of Loops: {gameState.loopCount}</li>
          <li>Number of Bots: {botState.numberOfBots}</li>
          <li>
            Random Walk activated: {botState.randomWalk ? "True" : "False"}
          </li>
          <li>Number cleaned Tiles: Unknown</li>
        </ul>
      </div>
    </div>
  );
};
