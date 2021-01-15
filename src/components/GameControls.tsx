import React from "react";
import { botActionTypes, gameActionTypes } from "../context/actionTypes";
import { mainGame } from "../App";
import { gameReducer } from "../context/reducers";

export let intervalID: NodeJS.Timeout;

export const GameControls: React.FC = () => {
  const [state, dispatch] = React.useReducer(gameReducer, mainGame.getState());

  const intervalRef: any = React.useRef();

  const handleStartClick = () => {
    console.log("Start Click");
    const id: NodeJS.Timeout = setInterval(() => {
      intervalRef.current = id;
      return dispatch({
        type: gameActionTypes.RUN_GAME,
        data: { running: true, intervalID: intervalRef.current },
      });
    }, 1000);
  };

  const handleStopClick = () => {
    dispatch({
      type: gameActionTypes.STOP_GAME,
      data: { running: false },
    });
  };

  const handleResetClick = () => {
    dispatch({
      type: gameActionTypes.RESET_GAME,
      data: { running: false },
    });
  };

  const handleAddBot = (): void => {
    dispatch({
      type: botActionTypes.ADD_BOT,
    });
  };

  return (
    <div>
      <h2>Controls</h2>
      <hr />
      <button onClick={handleStartClick}>Start</button>
      <button onClick={handleStopClick}>Stop</button>
      <button onClick={handleResetClick}>Reset</button>
      <button onClick={handleAddBot}>Add Bot</button>
    </div>
  );
};
