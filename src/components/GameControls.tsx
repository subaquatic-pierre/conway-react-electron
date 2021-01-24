import React from "react";
import { botActionTypes, gameActionTypes } from "../context/actionTypes";
import { GameContext, BotContext } from "../App";

export let intervalID: NodeJS.Timeout;

export const GameControls: React.FC = () => {
  const { gameState, gameDispatch } = React.useContext(GameContext);
  const { botState, botDispatch } = React.useContext(BotContext);

  const handleStartClick = () => {
    if (!gameState.running) {
      const intervalID: NodeJS.Timeout = setInterval(() => {
        gameDispatch({
          type: gameActionTypes.RUN_GAME,
          data: { running: true, intervalID: intervalID },
        });
        botDispatch({
          type: botActionTypes.UPDATE_BOT_LOCATION,
          data: { loopCount: gameState.loopCount, distance: 1 },
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

  const handleToggleRandomWalk = () => {
    const el: any = document.getElementById("randomWalk");
    const checked: boolean = el.checked ? true : false;

    botDispatch({
      type: botActionTypes.SET_RANDOM_WALK,
      data: { randomWalk: checked },
    });
  };

  return (
    <div>
      <h2>Game Controls</h2>
      <hr />
      <div style={{ padding: "1rem" }}>
        Toggle random walk
        <input
          onChange={handleToggleRandomWalk}
          type="checkbox"
          name="randomWalk"
          id="randomWalk"
          placeholder="Toggle random Walk"
        />
      </div>
      <div style={{ padding: "1rem" }}>
        <button onClick={handleStartClick}>Start</button>
        <button onClick={handleStopClick}>Stop</button>
        <button onClick={handleResetClick}>Reset</button>
      </div>
    </div>
  );
};
