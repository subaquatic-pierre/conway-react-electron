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
        return gameDispatch({
          type: gameActionTypes.RUN_GAME,
          data: { running: true, intervalID: intervalID },
        });
      }, 1000);
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
    gameDispatch({
      type: gameActionTypes.RESET_GAME,
      data: { running: false },
    });

    botDispatch({
      type: botActionTypes.RESET_BOTS,
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
