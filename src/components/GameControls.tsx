import React from "react";
import { botActionTypes, gameActionTypes } from "../context/actionTypes";
import { GameContext, BotContext } from "../App";

export let intervalID: NodeJS.Timeout;

export const GameControls: React.FC = () => {
  const { gameState, gameDispatch } = React.useContext(GameContext);
  const { botDispatch } = React.useContext(BotContext);

  const handleStartClick = () => {
    if (!gameState.running) {
      const intervalID: NodeJS.Timeout = setInterval(() => {
        gameDispatch({
          type: gameActionTypes.RUN_GAME,
          data: { running: true, intervalID: intervalID },
        });
        botDispatch({
          type: botActionTypes.UPDATE_BOT_LOCATION,
          data: { loopCount: gameState.loopCount, distance: 5 },
        });
      }, 50);
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
      <button onClick={handleStartClick}>Start</button>
      <button onClick={handleStopClick}>Stop</button>
      <button onClick={handleResetClick}>Reset</button>
    </div>
  );
};
