import React from "react";
import { botActionTypes, gameActionTypes } from "../context/actionTypes";
import { GameContext, BotContext } from "../App";

export let intervalID: NodeJS.Timeout;

export const GameControls: React.FC = () => {
  const { gameDispatch } = React.useContext(GameContext);
  const { botDispatch } = React.useContext(BotContext);

  const intervalRef: any = React.useRef();

  const handleStartClick = () => {
    console.log("Start Click");
    const id: NodeJS.Timeout = setInterval(() => {
      intervalRef.current = id;
      return gameDispatch({
        type: gameActionTypes.RUN_GAME,
        data: { running: true, intervalID: intervalRef.current },
      });
    }, 1000);
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
