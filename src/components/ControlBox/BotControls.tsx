import React from "react";
import { botActionTypes, gameActionTypes } from "../../context/actionTypes";
import { BotContext, GameContext } from "../../App";
export let intervalID: NodeJS.Timeout;

export const BotControls: React.FC = () => {
  const { botState, botDispatch } = React.useContext(BotContext);
  const { gameDispatch } = React.useContext(GameContext);

  const handleAddBot = (): void => {
    botDispatch({
      type: botActionTypes.ADD_BOT,
    });
  };

  const handleRemoveBot = (): void => {
    // Check number of bots is greater than 0 otherwise reset game
    if (botState.numberOfBots <= 1) {
      gameDispatch({
        type: gameActionTypes.STOP_GAME,
        data: { running: false },
      });
      botDispatch({
        type: botActionTypes.REMOVE_BOT,
        data: { lastBot: true },
      });
    } else {
      botDispatch({
        type: botActionTypes.REMOVE_BOT,
      });
    }
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
      <h2>Bot Controls</h2>
      <hr />
      <div className="panel">
        <label htmlFor="randomWalk">Toggle random walk: </label>
        <input
          onChange={handleToggleRandomWalk}
          type="checkbox"
          name="randomWalk"
          id="randomWalk"
          placeholder="Toggle random Walk"
        />
      </div>
      <div className="panel">
        <button onClick={handleAddBot}>Add Bot</button>
        <button onClick={handleRemoveBot}>Remove Bot</button>
      </div>
    </div>
  );
};
