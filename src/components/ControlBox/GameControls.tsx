import React from "react";
import { actionTypes } from "../../context/actionTypes";
import { Context } from "../../App";

export let intervalID: NodeJS.Timeout;

export const GameControls: React.FC = () => {
  const { state, dispatch } = React.useContext(Context);

  const handleStartClick = () => {
    // Ensure game is not running
    if (!state.gameState.running) {
      if (state.botState.numberOfBots <= 0) {
        return;
      }
      // Setup game loop with bot speed interval
      const intervalID: NodeJS.Timeout = setInterval(() => {
        dispatch({
          type: actionTypes.RUN_GAME,
          data: { running: true, intervalID: intervalID },
        });
        dispatch({
          type: actionTypes.UPDATE_BOT_LOCATION,
          data: { distance: 1 },
        });
      }, state.botState.botSpeed);
    }
  };

  const handleStopClick = () => {
    dispatch({
      type: actionTypes.STOP_GAME,
      data: { running: false },
    });
  };

  const handleResetClick = () => {
    dispatch({
      type: actionTypes.RESET_BOTS,
    });
    dispatch({
      type: actionTypes.RESET_GAME,
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
