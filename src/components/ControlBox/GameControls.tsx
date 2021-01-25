import React from "react";
import { botActionTypes, gameActionTypes } from "../../context/actionTypes";
import { GameContext, BotContext } from "../../App";

export let intervalID: NodeJS.Timeout;

export const GameControls: React.FC = () => {
  const { gameState, gameDispatch } = React.useContext(GameContext);
  const { botState, botDispatch } = React.useContext(BotContext);

  const handleStartClick = () => {
    // Ensure game is not running
    if (!gameState.running) {
      if (botState.numberOfBots <= 0) {
        return;
      }
      // Setup game loop with bot speed interval
      const intervalID: NodeJS.Timeout = setInterval(() => {
        gameDispatch({
          type: gameActionTypes.RUN_GAME,
          data: { running: true, intervalID: intervalID },
        });
        botDispatch({
          type: botActionTypes.UPDATE_BOT_LOCATION,
          data: { distance: 1 },
        });
      }, botState.botSpeed);
    }
  };

  const handleStopClick = () => {
    gameDispatch({
      type: gameActionTypes.STOP_GAME,
      data: { running: false },
    });
  };

  const handleResetClick = () => {
    botDispatch({
      type: botActionTypes.RESET_BOTS,
    });
    gameDispatch({
      type: gameActionTypes.RESET_GAME,
      data: { running: false },
    });
  };

  return (
    <div>
      <h2>Game Controls</h2>
      <hr />
      <div className="control-panel">
        <button onClick={handleStartClick}>Start</button>
        <button onClick={handleStopClick}>Stop</button>
        <button onClick={handleResetClick}>Reset</button>
      </div>
    </div>
  );
};
