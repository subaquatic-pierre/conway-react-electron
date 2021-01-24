import React from "react";
import { botActionTypes, gameActionTypes } from "../context/actionTypes";
import { GameContext, BotContext } from "../App";

export let intervalID: NodeJS.Timeout;

export const GameControls: React.FC = () => {
  const { gameState, gameDispatch } = React.useContext(GameContext);
  const { botState, botDispatch } = React.useContext(BotContext);

  const handleStartClick = () => {
    // Ensure game is not running
    if (!gameState.running) {
      if (botState.numberOfBots <= 0) {
        console.log("There are no bots to start the game");
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
    } else {
      console.log("Game is already running");
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
      <div style={{ padding: "1rem" }}>
        <button onClick={handleStartClick}>Start</button>
        <button onClick={handleStopClick}>Stop</button>
        <button onClick={handleResetClick}>Reset</button>
      </div>
    </div>
  );
};
