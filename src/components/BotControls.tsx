import React from "react";
import { botActionTypes } from "../context/actionTypes";
import { BotContext } from "../App";
export let intervalID: NodeJS.Timeout;

export const BotControls: React.FC = () => {
  const { botDispatch } = React.useContext(BotContext);

  const handleAddBot = (): void => {
    botDispatch({
      type: botActionTypes.ADD_BOT,
    });
  };

  return (
    <div>
      <h2>Bot Controls</h2>
      <hr />
      <button onClick={handleAddBot}>Add Bot</button>
    </div>
  );
};
